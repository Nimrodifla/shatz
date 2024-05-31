console.log("script loaded succesfuly.");

let local_db;
parse_db();

// Functions:

// in the future - reads from file / remote db
function parse_db()
{
    local_db  = {0: 'שבירת צופן', 1: 'שיעור צופן', 2: 'שירטוט צופן', 3: 'שמירת צופן', 4: 'שבירת צלע', 5: 'שמירת צלע', 6: 'שבלול צולע', 7: 'שין צדיק', 8: 'שבת צדיק', 9: 'שבת צחורה', 10: 'שוב צדקת', 11: 'שוב צדקתי', 12: 'שומע? צדקת', 13: 'שווה צביטה', 14: 'שווה צדקה', 15: 'שווה צפירה', 16: 'שווה צלעות', 17: 'שוטר צבאי', 18: 'שימון צבאי', 19: 'שולק צבים', 20: 'שרדר צבים', 21: 'שומעים צלול', 22: 'שלוק צלול', 23: 'שומר צוות', 24: 'שונא צרבת', 25: 'שופט צדיקים', 26: 'שינת צדיקים', 27: 'שחרור צואה', 28: 'שחרור צוויץ', 29: 'שחרור צלע', 30: 'שחרור צרור', 31: 'שי צהוב', 32: 'שלט צהוב', 33: 'שיבוש צעדים', 34: 'שיואו ציצי', 35: 'שלחי ציצי', 36: 'שמנת. ציצי?', 37: 'ששש... ציצי', 38: 'שתקי! ציצי?', 39: 'שיחה צפופה', 40: 'שייק צנוברים', 41: 'שיכור צרוד', 42: 'שילוב צבעים', 43: 'שינה צהלית', 44: 'שמחה צהלית', 45: 'שינוי צריך', 46: 'שירה צורמת', 47: 'שריקה צורמת', 48: 'שירה ציבורית', 49: 'שירת ציפורים', 50: 'שלאקה ציוותית', 51: 'שליחה צדיקה', 52: 'שליפת ציציות', 53: 'שליקה צמודה', 54: 'שמירה צמודה', 55: 'שליקת ציץ', 56: 'שלפי ציץ', 57: 'שלשול צווחני', 58: 'שמנה צינורית', 59: 'שמעתי צעקות', 60: 'שניצל צמיגי', 61: 'שפיכה צהובה', 62: 'שפשוף צנוע', 63: 'שתקן צנוע', 64: "שתקי צ'וצ'ה", 65: "שקט צ'וצ'ה", 66: 'שקט צוציק', 67: 'שקרן צבוע', 68: 'שרברב צמא', 69: 'שרוך צבעוני', 70: 'שרירי צוואר', 71: 'שרירן ציפלון', 72: 'שרמוטה צדיקה', 73: 'שרמוטה צודקת', 74: 'שרמוטה צוותית', 75: 'שרמוטה ציבורית', 76: 'שרמוטה צמודה', 77: 'שתיקת צרצרים', 78: 'שתית ציאניד?'};
}

// random int from 0 to max (max not included)
function randint(max)
{
    return Math.floor(Math.random() * max);
}

// returns random word number (as string)
function get_random_word_number()
{
    return randint(parseInt(Object.keys(local_db).length)).toString();
}

// get color to a mathing number
function get_color_by_number(max_number, number)
{
    let margin = 40; // so the first & last won't have very similar color but very far numbers
    // hsl color format
    let hue = number / max_number * (360 - margin); // hue (0 - 360)
    let sat = 43; // saturation (0 - 100)
    let light = 53; // lightness (0 - 100)
    return "hsl(" + hue + ", " + sat + "%, " + light + "%)"
}

// keyword can be eather the word or the number
function search_results(keyword)
{
    let results_arr = {};

    if (keyword.length == 0)
    {
        results_arr = local_db;
    }
    else
    {
        // word or number?
        let is_word = isNaN(keyword);

        for (let i in local_db)
        {
            let iter;
            let word = local_db[i];
            if (is_word)
                iter = local_db[i];
            else
                iter = i.toString();

            if (iter.includes(keyword))
            {
                results_arr[i] = word;
            }
        }
    }

    let results_length = Object.keys(results_arr).length;
    let total_length = Object.keys(local_db).length;
    cont_elem.innerHTML = '';
    cont_elem.innerHTML +='<h3>' + results_length + ' צירופים:' + '</h3>';
    for (let i in results_arr)
    {
        let word = results_arr[i];
        cont_elem.innerHTML += '<div class="word" style="color:' + get_color_by_number(total_length, parseInt(i)) + '">'
            + 'ש"צ' + ' [' + i + ']: <strong>' + word + '</strong></div>';
    }
}

// call this to update results
function search_box_change()
{
    let keyword = search_box_elem.value;
    search_results(keyword);
}

function load_learing_area(word_number, word, options_arr)
{
    const db_length = Object.keys(local_db).length;

    correct_elem.style.color = get_color_by_number(db_length, word_number);
    correct_elem.innerHTML = word;
    word_elem.style.color = get_color_by_number(db_length, parseInt(word_number))
    word_elem.innerHTML = 'ש"צ ' + '[<strong>' + word_number + '</strong>]';
    options_elem.innerHTML = 'בחר את הפירוש הנכון' + '<br>';

    for (let i in options_arr)
    {
        let opt = options_arr[i];
        options_elem.innerHTML += '<div onclick="check_learning_choice(' + opt['number'] + ', this);" class="learning-option">' +
                                '<strong>' + opt['word'] + '</strong>' +
                                '</div>'
    }

    return word_number; // return correct answer number
}

function load_new_learning()
{
    got_correct_ans = false; // local var in dua.html
    next_btn_elem.style.display = 'none'; // local var in dua.html

    let word_number = get_random_word_number();
    let word = local_db[word_number];
    
    const num_of_options = 4;
    let options_arr = [];
    for (let i = 0; i < num_of_options - 1; i++)
    {
        let flag = true;
        while (flag) {
            let rndopt = get_random_word_number();
            rndopt = {'word': local_db[rndopt], 'number': rndopt};
            // check if already in options_arr
            let found = false;
            for (let j in options_arr)
            {
                let o = options_arr[j];
                if (o['number'] == rndopt['number'])
                {
                    found = true;
                }
            }

            if (!(found || rndopt['word'] == word))
            {
                options_arr.push(rndopt);
                flag = false;
            }
        }
    }
    // add correct option
    options_arr.push({'word': word, 'number': word_number});
    // shuffle options order
    options_arr.sort(() => Math.random() - 0.5);

    return load_learing_area(word_number, word, options_arr);
}

function check_learning_choice(word_number, btn_elem)
{
    // if already got the correct ans, dont check again
    if (got_correct_ans == false)
    {
        const wrong_color = 'firebrick';
        const correct_color = 'MediumSeaGreen';
        const wrong_msgs = ['לא בדיוק...', 'אתה לא משהו אה?', 'בסדר יש לך את זה, פעם הבאה', 'אם לא תמשיך להתאמן איך תצליח?', 'כמעט... אבל לא', 'טעות אחשלנו', 'שמע אני אתחיל לחשוב שאתה פיתוח', 'לא.', 'פשוט לא', 'שקלת לוותר?', 'אל תוותר, ניסיון הבא אתה מצליח', 'לוזר', 'ממש ממש ממש לא', 'חשבתי שזה דיי קל', 'אני אגיד בעדינות שאתה לא מי שהייתי בוחר לשבת לידו בחד"א', 'ולידציה אה?', 'נפלת (מחקר), אבל אין מצב שאתה לא קם וממשיך'];
        const correct_msgs = ['תותח!', 'עכשיו זה - חנתר!', 'נודר שאתה תותח במק"ס', 'שוב צדקת! (ש"צ)', 'זה מחקרניק!', 'כבוד הרלב"ד - נכון', 'נותן בראש!!!', 'חיים שלי אני מאוהבת', 'תמשיך ככה עוד תזכה למצוות', 'מכונת עבודה', 'יא סימטרי!', 'הייתי מת לעשות לך ש"צ עכשיו (תנחש איזה)', 'גיבור!', 'איזה מלך', 'תלמיד חכמים אתה', 'בשאלה צדקת, אבל שים לב שאתה מתנהג באדיבות כלפי חבריתך', 'חיה!!!!!'];
        // correct_word_number is a local var in dua.html 
        if (word_number == correct_word_number)
        {
            // CORRECT!

            got_correct_ans = true;

            // color btn
            show_correct_btn(btn_elem);

            // show msg
            msg_elem.style.color = correct_color;
            msg_elem.innerHTML = correct_msgs[randint(correct_msgs.length)];
            
            // show correct satisfying animation
            // to do...

            // show next word quiz btn
            next_btn_elem.style.display = 'block';

            word_elem.innerHTML = '[' + word_number + ']: ' + local_db[word_number];
        }
        else{
            // WRONG!

            // color btn
            eliminate_btn(btn_elem);

            // show msg
            msg_elem.style.color = wrong_color;
            msg_elem.innerHTML = wrong_msgs[randint(wrong_msgs.length)];
        }
    }
}

function eliminate_btn(btn_elem)
{
    btn_elem.classList.add('eliminated');
}

function show_correct_btn(btn_elem)
{
    btn_elem.classList.add('correct');
}