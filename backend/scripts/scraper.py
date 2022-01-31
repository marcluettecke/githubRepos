import re
import time

from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager


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
        login_field.send_keys('marc.luettecke1@gmail.com')
        password_field = self.driver.find_element(by='id', value='password')
        password_field.send_keys('B-ball1234B-ball1234B-ball1234')
        password_field.submit()

    def __quit_driver(self):
        self.driver.quit()

    def scrape_contributors(self):
        self.__login()
        self.driver.get(self.url)
        time.sleep(1)
        contrib_list = self.driver.find_elements(By.CLASS_NAME, 'contrib-person')
        for el in contrib_list:
            self.contributor_accounts.append(
                re.split('\.com/(.*)', el.find_element(By.XPATH, 'span/h3/a').get_attribute('href'))[1])
        self.__quit_driver()
        print(self.contributor_accounts)
        return self.contributor_accounts


def main():
    scrapper_instance = ContributorScaper(
        url='https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/graphs/contributors')
    scrapper_instance.scrape_contributors()
    print(scrapper_instance.contributor_accounts)


if __name__ == '__main__':
    main()
