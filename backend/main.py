from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database import Base, engine
from src import models
from src.routers.users import user_router
from src.routers.albums import album_router
from src.routers.images import image_router

app = FastAPI()
origins = [
    "http://localhost:5173", # The default port for Vite/React
    "http://localhost:3000", # Another common port for React
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)
# Actually creates the tables (specified in models.py) in the database
Base.metadata.create_all(bind=engine)

app.include_router(user_router)
app.include_router(album_router)
app.include_router(image_router)

@app.get("/")
def display():
    return{"message": "Hello World!"}