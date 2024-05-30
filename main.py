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

# str to arr
w_arr = buffer.split('\n')

# delete ''
w_arr = [i for i in w_arr if i]

# smart sort - have same word, put close
# count all words
all_words_dic = dict()
i = 0
for w in w_arr:
    w1, w2 = w.split()
    w1 = w_to_v(w1)
    w2 = w_to_v(w2)

    if w1 in all_words_dic:
        all_words_dic[w1]['count'] += 1
    else:
        all_words_dic[w1] = {'count': 1, 'id': i}

    if w2 in all_words_dic:
        all_words_dic[w2]['count'] += 1
    else:
        all_words_dic[w2] = {'count': 1, 'id': i}
    i += 2

whole_pair_values = dict()
for w in w_arr:
    w1, w2 = w.split()
    w1 = w_to_v(w1)
    w2 = w_to_v(w2)

    c1 = all_words_dic[w1]['count']
    c2 = all_words_dic[w2]['count']
    
    p_id = 0

    if c1 > c2:
        p_id = all_words_dic[w1]['id']
    else:
        p_id = all_words_dic[w2]['id']
    
    whole_pair_values[w] = p_id

w_arr = sorted(w_arr, key=lambda x : whole_pair_values[x])


# write to file
with open('./words.txt', "wb") as w_file:
    w_file.write("\n".join(w_arr).encode(encoding='utf-8'))


print_words(w_arr)