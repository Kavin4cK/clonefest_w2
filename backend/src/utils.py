from .models import User
from fastapi import Depends, HTTPException

# This is the space to put all random functions

'''def get_password_hash(password):
    return pwd_context.hash(password)'''

# (Can change the contents of this list if needed)
album_privacy_list = ["Private", "Public", "Unlisted"]
image_privacy_list = ["Private", "Public", "Unlisted"]