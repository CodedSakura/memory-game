from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
import json

app = Flask(__name__, template_folder="./web", static_folder="./dist")
app.config["DEBUG"] = True

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username="the username from the 'Databases' tab",
    password="the password you set on the 'Databases' tab",
    hostname="the database host address from the 'Databases' tab",
    databasename="the database name from the 'Databases' tab",
)
app.config["SQLALCHEMY_POLL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

mock_db = []


class ScoreObj(db.Model):
    __tablename__ = "score"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(4096))
    score = db.Column(db.Integer)
    time = db.Column(db.BigInteger)
    size = db.Column(db.Integer)

    def __repr__(self):
        return f"ScoreObj<name={self.name},score={self.score},time={self.time},size={self.size}>"

    @staticmethod
    def from_req(data, size):
        so = ScoreObj(name=data["name"], score=data["score"], time=data["time"], size=size)
        return so

    def to_simple_obj(self):
        return {"name": self.name, "score": self.score, "time": self.time}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/API/score/<size>", methods=["GET", "POST"])
def score(size):
    if request.method == "GET":
        print(repr(mock_db))
        db_res = list(filter(lambda o: o.size == size, mock_db))[:10]
        print(repr(db_res))
        return json.dumps([o.to_simple_obj() for o in db_res])
        # db_res = ScoreObj.query.filter_by(size=size).order_by(ScoreObj.score.desc()).limit(10)
        # return json.dumps([o.to_simple_obj() for o in db_res])
    if request.method == "POST":
        score_obj = ScoreObj.from_req(request.get_json(), size)
        mock_db.append(score_obj)
        print(repr(mock_db))
        # db.session.add(score_obj)
        # db.session.commit()
        return ""
