<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="./frontend/src/assets/GitHub-Mark-120px-plus.png" alt="Logo" width="125" height="125">
  </a>

<h3 align="center">Github Repo Overview</h3>

  <p align="center" id="top">
    Github repository finder and overview tool.
    <br />
    <a href="https://github.com/marcluettecke/githubRepos"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/marcluettecke/tutoring-project/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->

## About The Project

<div align="left">
  <a href="https://github.com/github_username/repo_name">
    <img src="https://i.ibb.co/1Tk86yH/repo-screenshot.png" alt="Application screenshot showing the Github Repo overviews in a table format" width="100%">
  </a>
</div>

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Angular](https://angular.io/)
* [Angular Material](https://material.angular.io/)
* [Python](https://www.python.org/)
* [Flask](https://flask.palletsprojects.com/en/2.0.x/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->

## Getting Started

### Backend

The backend is a simple Flask (Python) application that serves one purpose: to run the webscraper to get the data that
is otherwise not available via the Github API - namely the contributors to a specific public repository.

To get it started you clone the repo and switch to the backend folder to find the requirements.txt file. I suggest you
start a new virtual environment (find a good guide [here](https://realpython.com/python-virtual-environments-a-primer/))
. Once this is done, enter your personal Github credentials into the scraper function under:

```
/backend/scripts/scraper.py
```

Here find the code snippet that shows:

```python
...


class ContributorScaper:
    def __init__(self, url):
        self.url = url
        op = webdriver.ChromeOptions()
        op.headless = True
        op.add_argument("--window-size=1920,1200")
        self.driver = webdriver.Chrome(ChromeDriverManager().install(), options=op)
        self.contributor_accounts = []

    def __login(self):
        self.driver.get("https://github.com/login")
        login_field = self.driver.find_element(by='id', value='login_field')
        login_field.send_keys('***')
        password_field = self.driver.find_element(by='id', value='password')
        password_field.send_keys('***')
        password_field.submit()


...
```

and replace the '***' in the login method with your personal Github credentials.

You now just head on to the `/app/__init__.py` file and run your python setup with all the requirements installed. This
should show a message along the lines of:

```
 * Serving Flask app '__init__' (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

, which states that your backend is now running on localhost port 5000.

### Frontend

Just as usual, clone this repository to your local machine and start a terminal in the local folder to run:

```
cd /frontend/
```

### Prerequisites

Make sure to have the lastest version of the Node Package Manager, and while you're at
it, [Node](https://nodejs.org/en/), installed:

  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/marcluettecke/githubRepos.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Get a Github Developer token, as
   explained [here](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
   to use the API and replace the values in the `frontend/src/app/environments/environment.ts` and
   the `frontend/src/app/environments/environment.prod.ts` files.
    ```
    export const environment = {
      production: false,
      githubAccessToken: '<ENTER YOUR ACCESS TOKEN HERE>',
      githubApiUrl: 'https://api.github.com/graphql'
    };
    ```
4. Set up the local API access by sending the access token along with your requests. For the GraphQL API, it will always
   be PUT-requests in the form of (using the angular HTTPClient):
    ```angular2html
    this.http.post<any>('https://api.github.com/graphql', {query: 'HERE COMES YOUR GRAPHQL QUERY'}, headers : {Authorization: 'bearer: "HERE COMES YOUR GH ACCESSTOKEN"'})
    ```
5. Run the local Angular environment via:
    ```angular2html
    ng serve
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->

## Usage

This project just serves as a styled baseline to extend for all kinds of interesting Github search engine ideas. The
first point will be to change the fetch queries in the
data-storage.service (`frontend/src/apps/services/data-storage.service.ts`) file to address your specific use cases.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->

## Roadmap

- Replace the lazy loading and the filtering mechanisms of the Angular Material table with an actual search
  functionality for all Github repos. This will require an extensive research on how to overcome the fetching limit of
  100 repos for free accounts and how to most efficiently search through millions of repos
- Include a simple but secure login logic with ideally data persistence -> add a database to the backend to save user
  information
- Allow the user to search for specific attributes, ideally designed within an intuitive GUI
- ...

Create an [open issues](https://github.com/github_username/repo_name/issues) for reporting issues and implementing
additional features.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->

## Contact

Marc Luettecke - [@MarcLuettecke](https://twitter.com/MarcLuettecke) - marc.luettecke1@gmail.com

Project Link: [https://github.com/marcluettecke/githubRepos](https://github.com/marcluettecke/githubRepos)

<p align="right">(<a href="#top">back to top</a>)</p>




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge

[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge

[forks-url]: https://github.com/github_username/repo_name/network/members

[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge

[stars-url]: https://github.com/github_username/repo_name/stargazers

[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge

[issues-url]: https://github.com/github_username/repo_name/issues

[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge

[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/linkedin_username

[product-screenshot]: images/screenshot.png
