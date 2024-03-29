from database import Database
from flask import Flask, jsonify, redirect, render_template, request, session, url_for
from werkzeug.security import generate_password_hash,check_password_hash
from password_checking import check_password_strength

app = Flask(__name__)
import sqlite3
con = sqlite3.connect("main.db") 
db = Database()
app.secret_key = 'key'
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/users')
def users():
    if not session.get('logged_in'):
        return redirect(url_for('login'))
    users = db.select_user_all()
    return render_template('users.html', users=users)


@app.route('/logout', methods=['POST'])
def logout():
    session.clear()  
    return render_template("index.html")

@app.route('/create-user', methods=['POST'])
def create_user():
    username = request.form['username']
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']
    hashed_password = generate_password_hash(password)
    user = db.select_user(email=email)
    user_username = db.select_user_by_username(username=username)
    is_strong, message = check_password_strength(password)
    if user:
        return jsonify({'message': 'This user already registered Please try again.'}), 400
    elif user_username :
        return jsonify({'message': 'Username already taken.!'}), 400
    elif not is_strong :
            return jsonify({'is_strong': is_strong, 'message': message}),400
    else :
        db.create_user(username=username,name=name,email=email,password=hashed_password)
        session['logged_in'] = True
        session['email'] = email
        return jsonify({'message': 'Registration successful'}), 200


@app.route('/block_user', methods=['POST'])
def block_user():
    user_email = request.form['email']
    db.block_user(email=user_email)
    return render_template('users.html')


@app.route('/unblock_user', methods=['POST'])
def unblock_user():
    user_email = request.form['email']
    db.unblock_user(email=user_email)
    return "Success"

@app.route('/delete_user', methods=['POST'])
def delete_user():
    user_email = request.form['email']
    db.delete_user(email=user_email)
    if session.get('email') == user_email:
        session.clear()
        return redirect(url_for("login"))
    else :
        return "ok"



@app.route('/login-user', methods=['POST'])
def login_user():
    email = request.form['email']
    password = request.form['password']
    user = db.select_user(email=email)
    print(user[0][4])
    print(password)
    if user and check_password_hash(user[0][4], password):
        session['logged_in'] = True
        session['email'] = email
        return jsonify({'message': 'Registration successful'}), 200
    else:
        return jsonify({'message': 'Incorrect email or password'}), 400

    


if __name__ == '__main__':
    app.run(debug=True)