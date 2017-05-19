from bs4 import BeautifulSoup

data = open("data.txt", 'r')

soup = BeautifulSoup(data, 'html.parser')

test = open("test.txt" , 'w')

#this array has everything that we need --course name, days, times
courseInfo = soup.find_all('td')

#arrays of data
className = []
classUnique = []
classDays = []
classTime = []
classRoom = []
classInstructor = []
classStatus = []


for x in range(0, len(courseInfo)):

	#populate className with all classNames
    classAttribute = courseInfo[x].get('class')
    if(classAttribute != None):
        if classAttribute[0] == 'course_header':
            className.append(courseInfo[x].h2.string)

    #populate classUnique with all class unique ID's
    classAttribute = courseInfo[x].get('data-th')
    if classAttribute != None:

    	#class Unique
    	if classAttribute == 'Unique':
    		classUnique.append(courseInfo[x].a.string)

    	#class Days
    	elif classAttribute == 'Days':
    		if(courseInfo[x].span == None):
    			classDays.append("None")
    		else:
    			classDays.append(courseInfo[x].span.string)

    	#class Time
    	elif classAttribute == 'Hour':
    		if(courseInfo[x].span == None):
    			classTime.append("None")
    		else:
    			classTime.append(courseInfo[x].span.string)

    	#class Room
    	elif classAttribute == 'Room':
    		if(courseInfo[x].span == None):
    			classRoom.append("Online")
    		else:
    			classRoom.append(courseInfo[x].span.string)

    	#class Instructor
    	elif classAttribute == 'Instructor':
    		if(courseInfo[x].span == None):
    			classInstructor.append("None")
    		else:
    			classInstructor.append(courseInfo[x].span.string)
    			

    	#class Status
    	elif classAttribute == 'Status':
    		classStatus.append(courseInfo[x].string)
    			


#write parsed data to file
for x in range(len(className)):
	test.write(className[x] + '\n')
	test.write(classUnique[x] + '\n')
	test.write(classStatus[x] + '\n')
	test.write(classDays[x] + '\n')
	test.write(classTime[x] + '\n')
	test.write(classRoom[x] + '\n')
	test.write(classInstructor[x] + '\n')
	test.write('\n')

test.close()
data.close()
