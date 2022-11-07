import tweepy
import os
import json
import requests

with open("../site/api/ak.json") as file:
	data = json.load(file)

consumer_key = os.environ['TWITTER_API_KEY']
consumer_secret = os.environ['TWITTER_API_KEY_SECRET']
access_token = os.environ['TWITTER_ACCESS_TOKEN']
access_token_secret = os.environ['TWITTER_ACCESS_TOKEN_SECRET']
auth = tweepy.OAuth1UserHandler(consumer_key, consumer_secret, access_token,
                                access_token_secret)

print("Auth twitter")
api = tweepy.API(auth)

print("Setting Twitter info")
api.update_profile(name=data["name"],
                   url=data["website"],
                   location=data["location"],
                   description=data["description"],
                   profile_link_color=data["color"])

print("Updating profile image")
api.update_profile_image(filename="../site/assets/ak/logo.png")

print("Upding banner image")
f = open('banner.jpg', 'wb')
f.write(requests.get(data["banner"]).content)
f.close()
api.update_profile_banner(filename="banner.jpg")
os.remove("banner.jpg")
