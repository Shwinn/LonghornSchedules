import json

majorName = []

with open('../jsonData.json', 'r') as data_file:
    data = json.load(data_file)

    previousMajorName = ""
    for classObject in data:
        if(classObject["CourseName"] != previousMajorName):
            majorName.append(classObject["CourseName"][0:3])
            previousMajorName = classObject["CourseName"]

    tempName = []
    previousMajorName = ""
    for i in range(len(majorName)):
        if(previousMajorName != majorName[i]):
            previousMajorName = majorName[i]
            tempName.append(majorName[i])

    majorName = tempName

with open('majorNames.json', 'w') as majorNameList:
    majorNameList.write("[\n")
    for i in range(len(majorName)):
        if(i != len(majorName) - 1):
            majorNameList.write("\t" + '"' + majorName[i] + '"')
            majorNameList.write(",\n")
        else:
            majorNameList.write('\t"' + majorName[i] + '"\n')
            majorNameList.write("]")
