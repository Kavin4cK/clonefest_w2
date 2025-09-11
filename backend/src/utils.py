from .models import User
from fastapi import Depends, HTTPException, UploadFile
from PIL import Image
import mimetypes

# This is the space to put all random functions

'''def get_password_hash(password):
    return pwd_context.hash(password)'''

# (Can change the contents of this list if needed)
album_privacy_list = ["Private", "Public", "Unlisted"]
image_privacy_list = ["Private", "Public", "Unlisted"]

def check_image_type(img: UploadFile):
    if img.content_type.split('/')[0] == "image":
        return True
    else:
        return False
    
def compare_type(oldname: str, newname: str):
    old_type = mimetypes.guess_type(oldname)
    if mimetypes.guess_type(newname)[0] == None:
        return (newname + mimetypes.guess_extension(old_type[0]))
    if old_type == mimetypes.guess_type(newname):
        return newname
    else:
        return None