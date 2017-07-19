import requests
from bs4 import BeautifulSoup

#initialize URL offsets
baseURL = "https://utdirect.utexas.edu/apps/registrar/course_schedule/20172/results/?search_type_main=UNIQUE&ccyys=20172&start_unique=00000&unique_number=&end_unique=99999&next_unique="
firstPageURL = '00000'
completeURL = baseURL + firstPageURL

cookie = {'NSC_vue-qspe_443':'ffffffffc3a018e445525d5f4f58455e445a4a42378b',
          'utlogin-prod':'AQIC5wM2LY4Sfcxb2-Yw2dXfBTakAdUOez4_gmyQqe1dIYs.*AAJTSQACMDIAAlMxAAIwNgACU0sAFC0xMzUwNjQ3NTg1MzcyODUyMTQ3*'
          }


completeData = open("completeData.txt", 'r+')


while(True):

	#uses url to get html data and write to completeData
	response = requests.get(completeURL, cookies = cookie)

	#partial data used to get new URL and is overridden every time
	partialData = open("partialData.txt", 'r+')
	partialData.truncate()
	partialData.write(response.text)
	partialData.close()
	
	
	
	completeData.write(response.text)
	
	newPartialData = open("partialData.txt", 'r')
	
	#generate new URL 
	index = -1
	soup = BeautifulSoup(newPartialData, 'html.parser')
	
	allLinks = soup.find_all('a')
	for a in range(len(allLinks)):

		allIDs = allLinks[a].get('id')
		if(allIDs == 'next_nav_link'):
			nextPage = allLinks[a].get('href')
			index = nextPage.find('next_unique') + 12
			completeURL = baseURL + nextPage[index: index+5]
			print('Data Downloaded Through Unique: ' + nextPage[index: index+5])
			break

		#if 'next_nav_link' doesnt exist then terminate

	if index == -1:
		break;

partialData.close()
completeData.close()