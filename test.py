from werkzeug.security import generate_password_hash, check_password_hash

# Example of generating a password hash
password = "ergashali123"
hashed_password = generate_password_hash(password)

# In your registration or when storing the password in the database, save the hashed_password

# Example of checking a password during login
input_password = "ergashali123"
# Retrieve the stored hashed password from the database
# hashed_password is the hashed password stored in the database
if check_password_hash(hashed_password, input_password):
    # Passwords match, proceed with login
    print("Login successful")
else:
    # Passwords do not match, authentication failed
    print("Incorrect password")
