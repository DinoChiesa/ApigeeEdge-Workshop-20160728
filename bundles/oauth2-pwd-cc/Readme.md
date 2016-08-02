# OAuthv2.0 Token Dispensing Proxy

This is an example proxy that illustrates how to use Apigee Edge to dispense tokens,
for the password grant_type and also for client_credentials grant_type.

This proxy runs in Apigee Edge and relies on a mock database of users that is implemented
within a Javascript hash.

The tokens dispensed here are opaque OAuth 2.0 tokens. They are not JWT. 

## Using the proxy

1. Import the proxy into any Apigee Edge organization

2. Create an API product. The API product normally wraps API proxies with metadata.
For the purposes of this example, your API product need not contain any API proxies.

3. Create a Developer within Apigee Edge

4. Create a Developer App within Apigee Edge, associated to the new Developer, and with
   authorization to use the API product.

5. View and copy the client_id and client_secret

6. invoke the API proxy to retrieve a token via password grant_type as:
   ```
   curl -i -X POST \
     -H 'content-type: application/x-www-form-urlencoded' \
     -H 'Authorization: Basic BASE64_BLOB_HERE' \
     'https://vhost-ip:vhost-port/v1/oauth2-pwd-cc/token' \
     -d 'grant_type=password&username=greg&password=GreenFrogJumpsHigh'
   ```  
   In the above, you need to correctly format the
   BASE64_BLOB_HERE to contain `Base64(client_id, client_secret)'`

   The username and password are validated against a static list of
   users, implemented in a JS callout. This will be replaced by a
   callout to a remote system (LDAP or other) to validate the credentials.
   
   
   The response you see will look like this:
   ```json
   {
     "refresh_token_issued": "2016-Mar-30T15:51:20.950",
     "issued": "2016-Mar-30T15:51:20.950",
     "application_name": "rbeckerapp1",
     "refresh_token_expires_in": 28799,
     "access_token": "voc70CKikpKVFOmxTs1iuapbAvdi",
     "client_id": "p1Lr9kXLERZOIAkE9QGIiwE0qAeluQL9",
     "refresh_token": "NNZUG00fbNHGEooUs10OA1tDPXs2wStY",
     "authenticated_user": "greg",
     "expires_in": 1799,
     "api_product_list": "[NprProduct2]",
     "user-roles": "A,B",
     "refresh_token_issued_at": 1459353080950,
     "grant_type": "password",
     "issued_at": 1459353080950
   }
   ```
   
   The available username and password that you pass can be one of these pairs:
   * carrie, carson
   * brandon, jones
   * justin, madalone
   * matthew, palmgren
   * matt, mcsweyn
   * david, knoernschild
   * edward, cerruti
   * dino, chiesa
   
   When you login as different users, you will see different roles returned in the user-roles property of the response payload.

7. invoke the API proxy to retrieve a token via client_credentials grant_type as:
   ```
   curl -i -X POST \
     -H 'content-type: application/x-www-form-urlencoded' \
     -H 'Authorization: Basic BASE64_BLOB_HERE' \
     'https://vhost-ip:vhost-port/v1/oauth2-pwd-cc/token' \
     -d 'grant_type=client_credentials'
   ```    
   You will see similar responses to the above, but without the user-specific
   information in the response payload. It will look like this:
   ```json
   {
     "issued": "2016-Mar-30T16:07:05.407",
     "application_name": "rbeckerapp1",
     "access_token": "MDPQbwExSOGpLkibGxZiVRpOfAgA",
     "client_id": "p1Lr9kXLERZOIAkE9QGIiwE0qAeluQL9",
     "expires_in": 1799,
     "api_product_list": "[NprProduct2]",
     "grant_type": "client_credentials",
     "issued_at": 1459354025407
   }
   ```


## Modifying the proxy

You can modify the API proxy to extend the mock database of users, adding users or adding fields for each user.  See
[userDB.js](apiproxy/resources/jsc/userDb.js) for information. It should be obvious.
If you want additional fields to appear in the OAuth token response, then you also need to
modify [validateUser.js](apiproxy/resources/jsc/validateUser.js) to set the appropriate variable into the context, and also modify [OAuthV2-GenerateAccessToken-PG.xml](apiproxy/policies/OAuthV2-GenerateAccessToken-PG.xml) to set an additional custom attribute. this should also be pretty obvious.

## Commentary

This API proxy dispenses opaque oauth tokens. The attributes associated to the dispensed tokens are stored in the key-management database within Apigee Edge. The API publisher has the ability to curate or adjust the response to requests for tokens. You could, for example, deliver a JSON payload with only the token and the expiry. The current example provides lots of additional information in the response.

These tokens are not JWT. JWT describes a standard way to format self-describing tokens.
Apigee Edge can generate and return JWT, that function in much the same way as the opaque oauth tokens shown here. This is not implemented in this example API Proxy. 

These tokens are not delivered via an OpenID Connect flow. OpenID connect describes an authentication flow on top of the OAuth 2.0 authorization framework. Apigee Edge can render JWT as a result of an OpenID Connect flow. This is not implemented in this example API Proxy.





