from flask import Flask, render_template

app = Flask(__name__, template_folder="./web", static_folder="./static")

app.config["DEBUG"] = True

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/API/score", methods=["GET", "POST"])
def score():
    pass