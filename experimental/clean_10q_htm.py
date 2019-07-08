
import sys

def find_all(string,match,matchlist=None):
    pos = 0
    if matchlist is None:
        while not string[pos:].find(match) == -1:
            print("match %d" % string[pos:].find(match)+pos)
            yield string[pos:].find(match) + pos
            pos = string[pos:].find(match) + pos

def extract_header(data):
    content_start = data.find('<p')
    content_end = data.find('</text')
    return data[content_start:content_end]

def clean_style_from_tag(data,tag):
    pos = 0
    while not data[pos:].find("<"+tag) == -1:
        if pos % 100 == 0:
            print(pos)
        tag_start = data[pos:].find("<"+tag) + pos
        tag_end = data[tag_start:].find(">") + tag_start
        data = data[:tag_start] + "<p" + data[tag_end:]
        pos = tag_end - (tag_end-tag_start) + len(tag) + 1
    return data

def cut_spaces(data):
    data = data.replace("<p>&nbsp;</p>","")
    return data

cleaned_data = extract_header(open(sys.argv[1],'r').read())
cleaned_data = cut_spaces(cleaned_data)
cleaned_data = clean_style_from_tag(cleaned_data,"p")
cleaned_data = clean_style_from_tag(cleaned_data,"tr")
cleaned_data = clean_style_from_tag(cleaned_data,"td")
cleaned_data = cut_spaces(cleaned_data)

writefile = open(sys.argv[2],'w')
writefile.write(cleaned_data)
writefile.close()
