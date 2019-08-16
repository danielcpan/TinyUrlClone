**TinyUrlClone is a URL shortner just like TinyUrl and Bitly**  
**Note, because I cannot purchase my own custom domain, this project's frontend is hosted on netlify and it's api on heroku. Because of this, the original url is really long and thus has no real world use case. Was made to simply demonstrate how to make a real world url shortner**

Check out the app! https://tiny-url-clone.netlify.com

## Budget App using the following technologies:

### BackEnd: 

- Engine: Nodejs
- Server:  Express
- ORM: Mongoose
- Database: MongoDb
- REST
- Test Frameworks: Mocha + Chai

### FrontEnd: 

- Main Frontend Framework: Reactjs
- State Management: Redux
- Style Framework: Material UI


### CRUD Functionality for links as well as keeps track of link visit anayltics such as clicks, unique clicks, ip, and geolocation.

#### Shorten Link
![ShortenUrl](https://user-images.githubusercontent.com/20826907/63155035-b275b880-bfc6-11e9-8df8-5b07e69e7a81.gif)

#### Open Shortned Link
![UseShortenedUrl](https://user-images.githubusercontent.com/20826907/63155036-b275b880-bfc6-11e9-8a34-e2d01164a3e7.gif)

#### Check Out Link Analytics
![GetLinkAnalytics](https://user-images.githubusercontent.com/20826907/63155037-b275b880-bfc6-11e9-9da8-dbdbe5858516.gif)

#### URL Shortening Logic

```javascript
const BASE_62 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

module.exports.decimalToBaseN = (decimal, baseN) => {
  const remainders = [];
  let newDecimal = decimal;

  while (newDecimal > 0) {
    const quotient = Math.floor(newDecimal / baseN);
    const remainder = newDecimal % baseN;
    newDecimal = quotient;
    remainders.push(remainder);
  }
  const result = remainders.reverse().map(remainder => BASE_62[remainder]).join('');
  return pad(result, 6);
};
```

Every created link is saved into mongoDB and given both the normal Object id as well as a sequential index id i.e. (1,2,3…n). 

I've designed the link endpoint to never be longer than 6 characters. 

If soley the sequential index were to be used, this would only make (10^6) - 1 or <u>999,999</u> shortned links possible. 

In effort to maximize the possiblities without increasing character count I implemented a base_62 converter where the sequential index would be converted to its base_62 representation. This allows there to (62^6) - 1 or <u>56,800,235,583</u> shortned links possible now. 

*Heard this about this problem from a friend's interview and figured it would be a fun project to try making.