## 🧬 SVC Classifier for diagnosis of kidney transplant rejection

###### The RT-MLPA assay as a simple molecular tool for diagnosis and classification of rejection in FFPE kidney transplant biopsies.

### SVC Classifier

The fitted classifiers & standard scalers were _pickled_ and are available in the `models/` folder. Two models are available : one with DSA input & one without.

### Setup ⚙️

#### Installation

Create a fresh python venv and install dependencies

```sh
python -m venv env
source ./env/bin/activate
pip install -r requirements.txt
```

#### Server

Start the **Flask** server with hot-reload

```sh
# run the flask server on http://127.0.0.1:5000
flask run
```

#### Web app

The front-end react app is bundled via parcel. Files will be built in the parent `/api/static/js` folder

```sh
cd web
yarn run watch # hot reload
yarn run build # build files
```

### Deployment ⚙️

#### Heroku

```sh
# run the app locally
heroku local web
# deploy to kidney-transplant-classifier.herokuapp.com/
git push heroku master
```
