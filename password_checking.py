def check_password_strength(password):
    if len(password) < 8:
        return False, "Password should be at least 8 characters long."
    has_lowercase = any(char.islower() for char in password)
    has_uppercase = any(char.isupper() for char in password)
    has_digit = any(char.isdigit() for char in password)
    has_special = any(char in '!@#$%^&*()-_=+[]{}|;:,.<>?/~' for char in password)
    if not (has_lowercase and has_uppercase and has_digit and has_special):
        return False, "Password should contain at least one lowercase letter, one uppercase letter, one digit, and one special character."

    common_passwords = ['password', '123456', 'qwerty', 'abc123'] 
    if password.lower() in common_passwords:
        return False, "Password is too common and easily guessable."

    return True, "Password meets the strength requirements."