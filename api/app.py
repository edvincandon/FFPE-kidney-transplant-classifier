from flask import Flask, jsonify, render_template, request
from flask_expects_json import expects_json

from api.classifier import Classifier

application = Flask(__name__)


@application.route('/')
def main():
    return render_template('main.html')


@application.route('/classify', methods=['POST'])
@expects_json(Classifier.schema)
def classify():
    classifier = Classifier(application, request.json)
    prediction, probabilities = classifier.predict()

    return jsonify({
        "prediction": prediction,
        "probabilities": probabilities
    })
