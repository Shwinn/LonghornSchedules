from bs4 import BeautifulSoup
import urllib.request

#uteid: js92242
#password: uteid2021


opener = urllib.request.build_opener()
opener.addheaders.append(('Cookie', 'NSC_vue-qspe_443=ffffffffc3a018e645525d5f4f58455e445a4a42378b;utlogin-prod=AQIC5wM2LY4SfczX6WfBEMbtBp4rIhlmwz9ew5cYAe9OlgE.*AAJTSQACMDIAAlMxAAIwMQACU0sAEjU4NjA4ODkwNDQxODQwMjA5NQ..*'))
f = open("data.txt", "wb")

baseUrl = "https://utdirect.utexas.edu/apps/registrar/course_schedule/20172/results/?search_type_main=UNIQUE&ccyys=20172&start_unique=00000&unique_number=&end_unique=99999&next_unique="
nextUnique = "00000"
finalUrl = baseUrl+nextUnique

#isDone = False
#while(!isDone):
#    r = opener.open(finalUrl).read()
#    f.write(r)
    

r = opener.open(finalUrl).read()
soup = BeautifulSoup(r)


f.write(r)
f.close()


