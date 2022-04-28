from flask import Flask, jsonify, render_template, request
from flask_expects_json import expects_json

from api.classifier import Classifier


def buildApp():
    app = Flask(__name__)

    @app.route('/')
    def main():
        return render_template('main.html')

    @app.route('/classify', methods=['POST'])
    @expects_json(Classifier.schema)
    def classify():
        classifier = Classifier(app, request.json)
        prediction, probabilities = classifier.predict()

        return jsonify({
            "prediction": prediction,
            "probabilities": probabilities
        })

    return app
