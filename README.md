# Summary 
A minimal URL shortner app with user management made with using **ExpressJS**.


# Models

## User Model
- name[varchar] - (mandatory field) users name.
- EmailId[varchar] - (mandatory field, Unique) users EmailId.
- password[varchar] - (mandatory field) users password.


## Url Model
- full[varchar] - (mandatory field) short url.
- short[varchar] - (mandatory field) original target url.
- clicks[int] - number of times url has been accessed (default = 0).

# APIs
## 1. User Register = [POST] - "/signup"
    - User can enter name,emailId and password to create an account(if already not created with given username). It returns a token for Authentication.


## 2. User Login = [POST] - "/login"
    - User can enter emailId and password to login. It returns a token for Authentication.


## 3. Short URL Create = [POST] - "short/shorturl"
    - User can create short url for his/her target url.
    - Authentication required.



## 4. View URL details = [GET] - "short/allurls"
    - User can view details of short url like number of times clicked .
    - Only owner of short url can view these details.
    - Authentication required.


## 8. Access URL = [GET] - "\<url>/"
    - Anyone with the short url can access this.


