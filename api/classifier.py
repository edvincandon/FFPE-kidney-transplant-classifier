import os
import pickle


class Classifier:
    schema = {
        'type': 'object',
        'properties': {
            'genes': {'type': 'object',
                      'properties': {
                          'CARD16': {'type': 'number'},
                          'CD72': {'type': 'number'},
                          'CD68': {'type': 'number'},
                          'CCL4': {'type': 'number'},
                          'CTLA4': {'type': 'number'},
                          'PLA1A': {'type': 'number'},
                          'ROBO4': {'type': 'number'},
                          'KLRD1': {'type': 'number'},
                          'FCGR3': {'type': 'number'},
                          'GNLY': {'type': 'number'},
                          'CXCL11': {'type': 'number'},
                          'CCL18': {'type': 'number'},
                          'CAV1': {'type': 'number'},
                          'PECAM': {'type': 'number'},
                          'PRF1': {'type': 'number'},
                          'ADAMDEC1': {'type': 'number'},
                          'IFNG': {'type': 'number'},
                      },
                      'required': ['CARD16',
                                   'CD72',
                                   'CD68',
                                   'CCL4',
                                   'CTLA4',
                                   'PLA1A',
                                   'ROBO4',
                                   'KLRD1',
                                   'FCGR3',
                                   'GNLY',
                                   'CXCL11',
                                   'CCL18',
                                   'CAV1',
                                   'PECAM',
                                   'PRF1',
                                   'ADAMDEC1',
                                   'IFNG']
                      },
            'DSA': {'type': 'number', 'optional': True}
        },
        'required': ['genes']
    }

    def __init__(self, app, data):
        self.app = app
        self.data = data
        self.withDSA = 'DSA' in self.data
        self.loadModel()

    def loadModel(self):
        prefix = "withDSA" if self.withDSA else "withoutDSA"
        print(prefix)
        path = os.path.join(self.app.root_path, '..', 'models')
        scaler_file = f'{path}/{prefix}-scaler.pkl'
        classifier_file = f'{path}/{prefix}-classifier.pkl'

        self.scaler = pickle.load(open(scaler_file, 'rb'))
        self.classifier = pickle.load(open(classifier_file, 'rb'))

    def predict(self):
        rawInput = list(self.data["genes"].values())
        if (self.withDSA):
            rawInput = [self.data['DSA']] + rawInput

        input = self.scaler.transform([rawInput])
        prediction = self.classifier.predict(input)
        labels = self.classifier.classes_
        probabilities = self.classifier.predict_proba(input)

        return prediction[0], dict(zip(labels, probabilities[0]))
