import requests

url = "https://utdirect.utexas.edu/apps/registrar/course_schedule/20172/results/?search_type_main=UNIQUE&ccyys=20172&start_unique=00000&unique_number=&end_unique=99999&next_unique=00430"

cookie = {'NSC_vue-qspe_443':'ffffffffc3a018e545525d5f4f58455e445a4a42378b',
          'utlogin-prod':'AQIC5wM2LY4SfcybLi9uC7fWii-qJxtXwNpqNDmey89MYmc.*AAJTSQACMDIAAlMxAAIwMQACU0sAFC0xMDEyMTY1MTU5Nzg0MTUyOTk1*'
          }

response = requests.get(url, cookies = cookie)

f = open("data.txt", 'w')
f.write(response.text)
f.close()


x = input("d")
