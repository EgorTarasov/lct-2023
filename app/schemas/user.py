from pydantic import BaseModel, EmailStr


class UserDto(BaseModel):
    id: int
    first_name: str
    middle_name: str
    last_name: str
    email: EmailStr
    gender: str
    hashed_password: str

    class ConfigDict:
        from_attributes = True


class UserCreateDto(BaseModel):
    id: int
    first_name: str
    middle_name: str
    last_name: str
    email: EmailStr
    gender: str
    hashed_password: str

    class ConfigDict:
        from_attributes = True
# class UserBase(BaseModel):
#     email: EmailStr
#     password: str


