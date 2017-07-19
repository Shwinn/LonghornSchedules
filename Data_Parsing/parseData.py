from bs4 import BeautifulSoup

print("opening data file...")
data = open("completeData.txt", 'r')

print("creating beutiful soup object...")
soup = BeautifulSoup(data, 'html.parser')

print("opening file to write...")
test = open("jsonData.json" , 'w')

#arrays of data
className = []
classUnique = []
classDays = []
classDays2 = []
classTime = []
classTime2 = []
classRoom = []
classRoom2 = []
classInstructor = []
classStatus = []

#this array has everything that we need --course name, days, times
courseInfo = soup.find_all('tr')

courseInfoDataLength = len(courseInfo)

for x in range(len(courseInfo)-1):
	#print("working " + str(x) + " of " + str(courseInfoDataLength))
	if(courseInfo[x].td != None):

		classAttribute = courseInfo[x].td.get('class')
		if(classAttribute != None):
			if(classAttribute[0] == 'course_header'):
				classNameIndex = x;
				x += 1

				while(True):
					#append class name data
					className.append(courseInfo[classNameIndex].h2.string)

					classData = courseInfo[x].find_all('td')

					for y in range(6):
						#splits remaining data into array e.g [' ', <span>MWF</span>, <br/>, ' ', <span class="second-row">W</span>, <br/>, ' ']
						content = classData[y].contents


						#unique ID
						if(y == 0):
							classUnique.append(content[0].string)
						#Days

						elif(y == 1):
							if(len(content) == 0):
								classDays.append("None")
								classDays2.append("None")
							else:
								if(content[1] != None):
									classDays.append(content[1].string)
									if(len(content) > 4):
										if(content[4] != None):
											classDays2.append(content[4].string)
										else:
											classDays2.append("None")
									else:
										classDays2.append("None")

						#Hour
						elif(y == 2):
							if(len(content) == 0):
								classTime.append("None")
								classTime2.append("None")
							else:
								classTime.append(content[1].string)
								if(len(content) > 4):
									if(content[4] != None):
										classTime2.append(content[4].string)
									else:
										classTime2.append("None")
								else:
									classTime2.append("None")
						#Room
						elif(y == 3):
							if(len(content) == 0):
								classRoom.append("None")
								classRoom2.append("None")
							else:
								classRoom.append(content[1].string)
								if(len(content) > 4):
									if(content[4] != None):
										classRoom2.append(content[4].string)
									else:
										classRoom2.append("None")
								else:
									classRoom2.append("None")

						elif(y == 4):
							if(len(content) == 0):
								classInstructor.append("None")
							else:
								classInstructor.append(content[0].string)
						elif(y == 5):
							classStatus.append(content[0].string)


					x += 1
					if(x == len(courseInfo)):
						break
					if(courseInfo[x].td == None):
						break
					classAttribute = courseInfo[x].td.get('class')
					if(classAttribute != None ):
						break


#write parsed data in JSON format
test.write('{\n  "Names":[\n')
for x in range(len(className)):
	test.write('    {\n      "CourseName": "' + className[x] + '",\n')
	test.write('      "Unique Number": "' + classUnique[x] + '",\n')
	test.write('      "Status": "'+ classStatus[x] + '",\n')
	test.write('      "Days": "' + classDays[x] + '",\n')
	test.write('      "Days2": "' + classDays2[x] + '",\n')
	test.write('      "Time": "'+ classTime[x] + '",\n')
	test.write('      "Time2": "' + classTime2[x] + '",\n')
	test.write('      "Room": "' + classRoom[x] + '",\n')
	test.write('      "Room2": "' + classRoom2[x] + '",\n')
	test.write('      "Instructor Name": "' + classInstructor[x] + '"\n    }')

	if(x != (len(className) - 1 ))	:
		test.write(",\n")
	else:
		test.write("\n")

test.write("]}")
test.close()
data.close()
