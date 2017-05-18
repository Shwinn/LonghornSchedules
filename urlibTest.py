import urllib.request
import requests
url = "https://login.utexas.edu/login/cdcservlet?goto=https%3A%2F%2Futdirect.utexas.edu%3A443%2Fapps%2Fregistrar%2Fcourse_schedule%2F20172%2Fresults%2F%3Fccyys%3D20172%26end_unique%3D99999%26next_unique%3D00615%26search_type_main%3DUNIQUE%26start_unique%3D00000%26unique_number%3D&RequestID=1491085828488&MajorVersion=1&MinorVersion=0&ProviderID=https%3A%2F%2Futdirect.utexas.edu%3A443%2Famagent%3FRealm%3D%2Fadmin%2Futdirect-realm&IssueInstant=2017-04-01T22%3A30%3A28Z"
url2 = "https://utdirect.utexas.edu/apps/registrar/course_schedule/20172/results/?ccyys=20172&end_unique=99999&next_unique=00615&search_type_main=UNIQUE&start_unique=00000&unique_number="

values = {'eid': 'js92242', 'password': 'uteid2021'}
r = requests.post(url, data=values)
print (r.content)

#page = urllib.request.urlopen(url2)
f = open("Source.txt", "wb")
f.write(r.content)
f.close()


y = input("sdf")
