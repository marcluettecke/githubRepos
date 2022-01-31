import json

from flask import Flask
from flask_cors import CORS

from backend.scripts.scraper import ContributorScaper

app = Flask(__name__)
CORS(app)


@app.route('/repositories/<owner>/<repo>/contributors')
def default(owner, repo):
    scrapper_instance = ContributorScaper(
        url=f'https://github.com/{str(owner)}/{str(repo)}/graphs/contributors')
    return json.dumps(scrapper_instance.scrape_contributors())


app.run()
