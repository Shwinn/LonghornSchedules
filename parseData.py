from bs4 import BeautifulSoup

data = open("data.txt", 'r')

soup = BeautifulSoup(data, 'html.parser')

test = open("test.txt" , 'w')

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
tableBody = soup.tbody
courseInfo = tableBody.find_all('tr')

classIndex = 0

for x in range(len(courseInfo)-1):
	classAttribute = courseInfo[x].td.get('class')
	if(classAttribute != None):
		if(classAttribute[0] == 'course_header'):
			classNameIndex = x;
			x += 1

			while(True):
				className.append(courseInfo[classNameIndex].h2.string)

				classData = courseInfo[x].find_all('td')

				for y in range(6):
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
								if(content[2].span != None):
									classDays2.append(content[2].span.string)
								else:
									classDays2.append("None")

					#Hour
					elif(y == 2):
						if(len(content) == 0):
							classTime.append("None")
							classTime2.append("None")
						else:
							classTime.append(content[1].string)
							if(content[2].span != None):
								classTime2.append(content[2].span.string)
							else:
								classTime2.append("None")
					#Room
					elif(y == 3):
						if(len(content) == 0):
							classRoom.append("None")
							classRoom2.append("None")
						else:
							classRoom.append(content[1].string)
							if(content[2].span != None):
								classRoom2.append(content[2].span.string)
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

				classAttribute = courseInfo[x].td.get('class')
				if(classAttribute != None ):
					break


#write parsed data to file
for x in range(len(className)):
	test.write("Course Name: " + className[x] + '\n')
	test.write("Unique Number: " + classUnique[x] + '\n')
	test.write("Status: " + classStatus[x] + '\n')
	test.write("Days: " + classDays[x] + '\n')
	test.write("      " + classDays2[x] + '\n')
	test.write("Time: " + classTime[x] + '\n')
	test.write("      " + classTime2[x] + '\n')
	test.write("Room: " + classRoom[x] + '\n')
	test.write("      " + classRoom2[x] + '\n')
	test.write("Instructor Name: " + classInstructor[x] + '\n')
	test.write('\n')

test.close()
data.close()
