import json

# word to valid (remove non letters)
def w_to_v(w):
    forbiden = ['?', '!', '.', ',']
    for f in forbiden:
        w = w.replace(f, '')
    
    return w

def print_words(arr):
    for w in arr:
        print(w)

# correction & sorting

buffer = ''
# read from file
with open('./words.txt', "rb") as w_file:
    buffer = bytes(w_file.read()).decode(encoding='utf-8')

# parse to dict
arr = [i for i in buffer.split('\n') if i]
res_dict = dict()
for i, w in enumerate(arr):
    res_dict[i] = w

with open('./words.json', "wb") as w_file:
    w_file.write(json.dumps(res_dict).encode(encoding='utf-8'))

#print(res_dict)