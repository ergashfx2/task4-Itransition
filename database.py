import sqlite3


class Database:
    def __init__(self, path_to_db="main.db"):
        self.path_to_db = path_to_db

    @property
    def connection(self):
        return sqlite3.connect(self.path_to_db)

    @staticmethod
    def format_args(sql, parameters: dict):
        sql += " AND ".join([
            f"{item} = ?" for item in parameters
        ])
        return sql, tuple(parameters.values())

    def execute(self, sql: str, parameters: tuple = None, fetchone=False, fetchall=False, commit=False):
        if not parameters:
            parameters = ()
        connection = self.connection
        cursor = connection.cursor()
        data = None
        cursor.execute(sql, parameters)

        if commit:
            connection.commit()
        if fetchall:
            data = cursor.fetchall()
        if fetchone:
            data = cursor.fetchone()
        connection.close()
        return data
    
    def create_user(self, username, name, email,password):
        sql = """INSERT INTO Users(username, name, email,password) VALUES(?, ?, ?, ?)"""
        self.execute(sql, parameters=(username, name,email,password), commit=True)

    def select_user_all(self):
        return self.execute('SELECT * FROM Users;', fetchall=True)
    
    def select_user(self, email):
        sql = "SELECT * FROM Users WHERE email = ?"
        result = self.execute(sql=sql, parameters=(email,),fetchall=True)
        return result
    
    def block_user(self, email):
            sql = "UPDATE Users SET status = 'Blocked' WHERE email = ?"
            self.execute(sql, parameters=(email,),commit=True)

    def unblock_user(self, email):
        sql = "UPDATE Users SET status = 'Active' WHERE email = ?"
        self.execute(sql, parameters=(email,),commit=True)

    def delete_user(self, email):
        sql = "DELETE FROM Users WHERE email = ?"
        self.execute(sql, parameters=(email,),commit=True)

