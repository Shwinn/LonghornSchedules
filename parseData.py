from bs4 import BeautifulSoup

data = open("data.txt", 'r')

soup = BeautifulSoup(data, 'html.parser')

test = open("test.txt" , 'w')

tag = soup.find_all('td')


for x in range(0, len(tag)):
    class_attribute = tag[x].get('class')
    if(class_attribute != None):
        if class_attribute[0] == 'course_header':
            print(tag[x].h2.string)

test.close()
data.close()
