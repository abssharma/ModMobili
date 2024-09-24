from exts import db

class Mod(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(), nullable=False)
    brand = db.Column(db.String(), nullable=False)
    model = db.Column(db.String(), nullable=False)
    yom = db.Column(db.Integer(), nullable=False)
    part = db.Column(db.String(), nullable=False)
    
    def __repr__(self):
        return f"<Mod {self.name}>"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, name, brand, model, yom, part):
        self.name = name
        self.brand = brand
        self.model = model
        self.yom = yom
        self.part = part

        db.session.commit()

# user model
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(25), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False)
    password = db.Column(db.Text(), nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"

    def save(self):
        db.session.add(self)
        db.session.commit()    
