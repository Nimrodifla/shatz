console.log("script loaded succesfuly.");

let local_db;

// Elements:
let cont_elem = document.getElementById('cont');
let search_box_elem = document.getElementById('search_box');

// Init Procces:
parse_db();
search_box_elem.addEventListener('input', search_box_change);
search_box_change(); // show all results

// Functions:

// in the future - reads from file / remote db
function parse_db()
{
    local_db  = {0: 'שבירת צופן', 1: 'שיעור צופן', 2: 'שירטוט צופן', 3: 'שמירת צופן', 4: 'שבירת צלע', 5: 'שמירת צלע', 6: 'שבלול צולע', 7: 'שין צדיק', 8: 'שבת צדיק', 9: 'שבת צחורה', 10: 'שוב צדקת', 11: 'שוב צדקתי', 12: 'שומע? צדקת', 13: 'שווה צביטה', 14: 'שווה צדקה', 15: 'שווה צפירה', 16: 'שווה צלעות', 17: 'שוטר צבאי', 18: 'שימון צבאי', 19: 'שולק צבים', 20: 'שרדר צבים', 21: 'שומעים צלול', 22: 'שלוק צלול', 23: 'שומר צוות', 24: 'שונא צרבת', 25: 'שופט צדיקים', 26: 'שינת צדיקים', 27: 'שחרור צואה', 28: 'שחרור צוויץ', 29: 'שחרור צלע', 30: 'שחרור צרור', 31: 'שי צהוב', 32: 'שלט צהוב', 33: 'שיבוש צעדים', 34: 'שיואו ציצי', 35: 'שלחי ציצי', 36: 'שמנת. ציצי?', 37: 'ששש... ציצי', 38: 'שתקי! ציצי?', 39: 'שיחה צפופה', 40: 'שייק צנוברים', 41: 'שיכור צרוד', 42: 'שילוב צבעים', 43: 'שינה צהלית', 44: 'שמחה צהלית', 45: 'שינוי צריך', 46: 'שירה צורמת', 47: 'שריקה צורמת', 48: 'שירה ציבורית', 49: 'שירת ציפורים', 50: 'שלאקה ציוותית', 51: 'שליחה צדיקה', 52: 'שליפת ציציות', 53: 'שליקה צמודה', 54: 'שמירה צמודה', 55: 'שליקת ציץ', 56: 'שלפי ציץ', 57: 'שלשול צווחני', 58: 'שמנה צינורית', 59: 'שמעתי צעקות', 60: 'שניצל צמיגי', 61: 'שפיכה צהובה', 62: 'שפשוף צנוע', 63: 'שתקן צנוע', 64: "שתקי צ'וצ'ה", 65: "שקט צ'וצ'ה", 66: 'שקט צוציק', 67: 'שקרן צבוע', 68: 'שרברב צמא', 69: 'שרוך צבעוני', 70: 'שרירי צוואר', 71: 'שרירן ציפלון', 72: 'שרמוטה צדיקה', 73: 'שרמוטה צודקת', 74: 'שרמוטה צוותית', 75: 'שרמוטה ציבורית', 76: 'שרמוטה צמודה', 77: 'שתיקת צרצרים', 78: 'שתית ציאניד?'};
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
            + 'ש"צ מספר' + ' [' + i + ']: <strong>' + word + '</strong></div>';
    }
}

// call this to update results
function search_box_change()
{
    let keyword = search_box_elem.value;
    search_results(keyword);
}