import json

from flask import Flask, send_from_directory
from flask_cors import CORS

from backend.scripts.scraper import ContributorScaper

app = Flask(__name__)
CORS(app)


@app.route('/contributors')
def default():
    scrapper_instance = ContributorScaper(
        url='https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/graphs/contributors')
    return json.dumps(scrapper_instance.scrape_contributors())
    # return scrapper_instance.contributor_accounts


app.run()
