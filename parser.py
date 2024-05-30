u_input = ''
words = []
buffer = ''
while u_input != 'end':
    words.append(u_input)
    buffer += u_input + '\n'
    u_input = input(str(len(words)) + " - Enter: ")

words = words[1:]

with open('./words.txt', "w") as res_file:
    res_file.write(str(words))