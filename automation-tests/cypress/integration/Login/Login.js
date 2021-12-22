const {Builder, By, Key, util} = require("selenium-webdriver");
const session = require("selenium-webdriver/lib/session");
var token = ''
async function Login(){
    let driver = await new Builder().forBrowser('chrome').build();
    // await driver.get('https://login.salesforce.com/')
    await driver.get('http://localhost:3000/#/')
    await driver.findElement(By.className('c-login-start__btn')).click()
    await driver.findElement(By.xpath('/html/body/div/main/section/div/div/div/div/form[2]/button')).click()
    await driver.findElement(By.id('username')).sendKeys('sergiu.merticariu.assist@natterbox.com')
    await driver.findElement(By.id('password')).sendKeys('Salesforceqa@123')
    await driver.findElement(By.id('Login')).click()
    // await driver.get('https://natterbox-3c-dev-ed--c.visualforce.com/apex/wallboardsPage#/')
    setTimeout(function waitFiveSeconds() {
       // driver.executeScript("return window.WbConfig.sfSessionId").then(($token)=>{
        driver.executeScript("return localStorage.getItem('@@auth0spajs@@::40leAQozuSfAQGf52Lf4JBeY6QIXBvmc::https://sapien-proxy.redmatter-qa01.pub/::openid profile email flightdeck:admin flightdeck:team-leader flightdeck:basic')").then(($token)=>{
            token = $token
            console.log($token)
            const fs = require('fs')
            let data = token
            fs.writeFile('token.txt', data, (err)=>{
                if(err)
                throw err;
            })
        })
    }, 5000)
    storage.clear();
    setTimeout(function waitSixSeconds(){
        driver.quit();
    }, 6000)
    
}

async function LoginFlightdeck(){
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://flightdeck.natterbox-qa01.net/#/')
    await driver.findElement(By.className('c-login-start__btn')).click()
    await driver.findElement(By.xpath('/html/body/div/main/section/div/div/div/div/form[2]/button')).click()
    await driver.findElement(By.id('username')).sendKeys('sergiu.merticariu@assist.ro')
    await driver.findElement(By.id('password')).sendKeys('Salesforceqa@123')
    await driver.findElement(By.id('Login')).click()
    // await driver.get('https://natterbox-3c-dev-ed--c.visualforce.com/apex/wallboardsPage#/')

    setTimeout(function waitFiveSeconds() {
        driver.executeScript("return localStorage.getItem('@@auth0spajs@@::40leAQozuSfAQGf52Lf4JBeY6QIXBvmc::https://sapien-proxy.redmatter-qa01.pub/::openid profile email flightdeck:admin flightdeck:team-leader flightdeck:basic')").then(($token)=>{
            token = $token
            const fs = require('fs')
            let data = token
            fs.writeFile('tokenflightdeck.txt', data, (err)=>{
                if(err)
                throw err;
            })
        })
    }, 5000)    
    setTimeout(function waitSixSeconds(){
        driver.quit();
    }, 6000)
}

async function LoginBasic(){
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:3000/#/')
    await driver.findElement(By.className('c-login-start__btn')).click()
    await driver.findElement(By.xpath('/html/body/div/main/section/div/div/div/div/form[2]/button')).click()
    await driver.findElement(By.id('username')).sendKeys('sergiu.merticariu@assist.ro')
    await driver.findElement(By.id('password')).sendKeys('Salesforceqa@123')
    await driver.findElement(By.id('Login')).click()
    //await driver.get('http://localhost:3000/#/')

    setTimeout(function waitFiveSeconds() {
        driver.executeScript("return localStorage.getItem('@@auth0spajs@@::40leAQozuSfAQGf52Lf4JBeY6QIXBvmc::https://sapien-proxy.redmatter-qa01.pub/::openid profile email flightdeck:admin flightdeck:team-leader flightdeck:basic')").then(($token)=>{
            token = $token
            const fs = require('fs')
            let data = token
            fs.writeFile('tokenbasic.txt', data, (err)=>{
                if(err)
                throw err;
            })
        })
    }, 5000)
    setTimeout(function waitSixSeconds(){
        driver.quit();
    }, 6000)
}

Login();
// LoginFlightdeck();
LoginBasic();


