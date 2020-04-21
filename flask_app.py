from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

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


class ScoreObj(db.Model):
    __tablename__ = "score"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(4096))
    score = db.Column(db.Integer)
    size = db.Column(db.Integer)

    @staticmethod
    def from_req(req):
        so = ScoreObj(name=req)
        return so


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/API/score", methods=["GET", "POST"])
def score():
    if request.method == "GET":
        return "{}"
    if request.method == "POST":
        print(str(request))
        return "done"
        # score_obj = ScoreObj.from_req(request)
        # db.session.add(score_obj)
        # db.session.commit()
