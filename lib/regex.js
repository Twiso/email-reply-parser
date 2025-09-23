let RE2;
let hasRE2;

class RegexList {
  constructor() {
    this.SafeRegExp = hasRE2 !== false
        ? (() => {
          if (typeof RE2 === 'function') return RE2;
          try {
            RE2 = require('re2');
            return typeof RE2 === 'function' ? RE2 : RegExp;
          } catch {
            hasRE2 = false;
            return RegExp;
          }
        })()
        : RegExp;

    this.answerHeadersRegex = this.buildRe2([
      // English
      /^>*-*\s*(On\s.+\s.+\n?wrote:{0,1})\s{0,1}-*$/m,

      // French
      /^>*-*\s*(Le\s.+\s.+\n?écrit\s?:{0,1})\s{0,1}-*$/m,

      // Spanish
      /^>*-*\s*(El\s.+\s.+\n?escribió:{0,1})\s{0,1}-*$/m,

      // Italian
      /^>*-*\s*(Il\s.+\s.+\n?scritto:{0,1})\s{0,1}-*$/m,

      // Portuguese
      /^>*-*\s*(Em\s.+\s.+\n?escreveu:{0,1})\s{0,1}-*$/m,

      // German
      /^>*\s*(Am\s.+\s)\n?\n?schrieb.+\s?(\[|<).+(\]|>):$/m,

      // Dutch
      /^>*\s*(Op\s[\s\S]+?\n?schreef[\s\S]+:)$/m,

      // Polish
      /^>*\s*((W\sdniu|Dnia)\s[\s\S]+?(pisze|napisał(\(a\))?):)$/mu,

      // Danish/Norwegian
      /^>*\s*(Den\s.+\s\n?skrev\s.+:)$/m,

      // Finnish
      /^>*\s*(pe\s.+\s.+\n?kirjoitti:)$/m,

      // Russian
      /^>*\s*(ср\,\s.+\n? г\. в\s.+,\s.+[\[|<].+[\]|>]:)$/m,

      // Chinese
      /^>*(在[\s\S]+写道：)$/m,
      /^>*(回复于[\s\S]+[写|说]道：)$/m,

      // Korean
      /^>*(20[0-9]{2}\..+\s작성:)$/m,
      /^>*(.+님이\s작성하신\s메시지:)$/m,

      // Japanese
      /^>*(20[0-9]{2}\/.+のメッセージ:)$/m,
      /^>*(.+さんより:)$/m,

      // Swedish
      /^>*(.+\sskrev\sden\s.+:)$/m,

      // Norwegian
      /^>*(På\s.+\sskrev\s.+:)$/m,

      // Greek
      /^>*(Στις\s.+,\s[\s\S]+έγραψε:)$/m,

      // Turkish
      /^>*(.+\starihinde\s.+\syazdı:)$/m,

      // Czech
      /^>*(Dne\s.+\snapsal\s.+:)$/m,

      // Hungarian
      /^>*(.+\sírta\s.+:)$/m,

      // Romanian
      /^>*(La\s.+,\s.+\sa\sscris:)$/m,

      // Vietnamese
      /^>*(Vào\s.+,\s.+\sđã\sviết:)$/m,

      // Thai
      /^>*(เมื่อ\s.+\s.+\sเขียน:)$/m,

      // Indonesian
      /^>*(Pada\s.+,\s.+\smenulis:)$/m,

      // Hebrew
      /^>*(ב־.+\sכתב\/ה\s.+:)$/m,

      // Arabic
      /^>*(في\s.+\sكتب\s.+:)$/m,

      // Generic Headers
      /^>*(.+\s<.+>\sschrieb:)$/m,
      /^>*(.+\son.*at.*wrote:)$/m,
      /^>*\s*(From\s?:.+\s?\n?\s*[\[|<].+[\]|>])/m,
      /^>*\s*(Von\s?:.+\s?\n?\s*[\[|<].+[\]|>])/m,
      /^>*\s*(De\s?:.+\s?\n?\s*(\[|<).+(\]|>))/m,
      /^>*\s*(Van\s?:.+\s?\n?\s*(\[|<).+(\]|>))/m,
      /^>*\s*(Da\s?:.+\s?\n?\s*(\[|<).+(\]|>))/m,
      /^>*(20[0-9]{2})-([0-9]{2}).([0-9]{2}).([0-9]{2}):([0-9]{2})\n?(.*)>:$/m,
      /^>*\s*([a-z]{3,4}\.\s[\s\S]+\sskrev\s[\s\S]+:)$/m,
      /^>*([0-9]{2}).([0-9]{2}).(20[0-9]{2})(.*)(([0-9]{2}).([0-9]{2}))(.*)\"( *)<(.*)>( *):$/m,
      /^>*[0-9]{2}:[0-9]{2}(.*)[0-9]{4}(.*)\"( *)<(.*)>( *):$/,
      /^>*(.*)[0-9]{4}(.*)from(.*)<(.*)>:$/,

      // Original Message Headers in different languages
      /^>*-{1,12} ?(O|o)riginal (M|m)essage ?-{1,12}$/i,
      /^>*-{1,12} ?(O|o)prindelig (B|b)esked ?-{1,12}$/i,
      /^>*-{1,12} ?(M|m)essage d\'origine ?-{1,12}$/i,
      /^>*-{1,12} ?(O|o)riginele (B|b)ericht ?-{1,12}$/i,
      /^>*-{1,12} ?(M|m)ensaje (O|o)riginal ?-{1,12}$/i,
      /^>*-{1,12} ?(M|m)essaggio (O|o)riginale ?-{1,12}$/i,
      /^>*-{1,12} ?(O|o)riginalnachricht ?-{1,12}$/i,
      /^>*-{1,12} ?(A|a)lkuperäinen (V|v)iesti ?-{1,12}$/i,
      /^>*-{1,12} ?(O|o)ryginalna (W|w)iadomość ?-{1,12}$/i
    ]);

    this.signatureRegex = this.buildRe2([
      // Separators
      /^\s*-{2,4}$/,
      /^\s*_{2,4}$/,
      /^-- $/,
      /^\+{2,4}$/,
      /^\={2,4}$/,
      /^________________________________$/,

      // English
      /^Sent from (?:\s*.+)$/,
      /^Get Outlook for (?:\s*.+).*/m,
      /^Cheers,?!?$/mi,
      /^Best wishes,?!?$/mi,
      /^\w{0,20}\s?(\sand\s)?Regards,?!?！?$/mi,
      /^Sincerely,?$/mi,

      // German
      /^Von (?:\s*.+) gesendet$/,
      /^Gesendet von (?:\s*.+) für (?:\s*.+)$/,
      /^Mit freundlichen Grüßen,?$/mi,
      /^Viele Grüße,?$/mi,

      // Danish
      /^Sendt fra (?:\s*.+)$/,
      /^Med venlig hilsen,?$/mi,

      // French
      /^Envoyé depuis (?:\s*.+)$/,
      /^Envoyé de mon (?:\s*.+)$/,
      /^Envoyé à partir de (?:\s*.+)$/,
      /^Télécharger Outlook pour (?:\s*.+).*/m,
      /^Bien . vous,?!?$/mi,
      /^\w{0,20}\s?cordialement,?!?$/mi,
      /^Bonne (journ.e|soir.e)!?$/mi,

      // Spanish
      /^Enviado desde (?:\s*.+)$/,
      /^Saludos,?$/mi,
      /^Atentamente,?$/mi,

      // Italian
      /^Inviato da (?:\s*.+)$/,
      /^Cordiali saluti,?$/mi,
      /^Distinti saluti,?$/mi,

      // Dutch
      /^Verzonden vanaf (?:\s*.+)$/,
      /^Verstuurd vanaf (?:\s*.+)$/,
      /^Met vriendelijke groet,?$/mi,

      // Portuguese
      /^Enviado do (?:\s*.+)$/,
      /^Atenciosamente,?$/mi,
      /^Cumprimentos,?$/mi,

      // Swedish
      /^Skickat från (?:\s*.+)$/,
      /^Med vänliga hälsningar,?$/mi,

      // Norwegian
      /^Sendt fra (?:\s*.+)$/,
      /^Med vennlig hilsen,?$/mi,

      // Finnish
      /^Lähetetty (?:\s*.+)$/,
      /^Ystävällisin terveisin,?$/mi,

      // Russian
      /^Отправлено из (?:\s*.+)$/,
      /^С уважением,?$/mi,

      // Chinese
      /^从(?:\s*.+)发送$/,
      /^此致$/mi,
      /^敬祝$/mi,

      // Japanese
      /^送信元：(?:\s*.+)$/,
      /^よろしくお願いします。?$/mi,

      // Korean
      /^보낸 사람: (?:\s*.+)$/,
      /^감사합니다.?$/mi,

      // Turkish
      /^Gönderen: (?:\s*.+)$/,
      /^Saygılarımla,?$/mi,

      // Greek
      /^Στάλθηκε από (?:\s*.+)$/,
      /^Με εκτίμηση,?$/mi,

      // Polish
      /^Wysłano z (?:\s*.+)$/,
      /^Z poważaniem,?$/mi,

      // Czech
      /^Odesláno z (?:\s*.+)$/,
      /^S pozdravem,?$/mi,

      // Hungarian
      /^Küldte: (?:\s*.+)$/,
      /^Üdvözlettel,?$/mi,

      // Vietnamese
      /^Gửi từ (?:\s*.+)$/,
      /^Trân trọng,?$/mi

      // Hebrew Signatures
      /^בברכה,?$/mi,  // Best regards
      /^בכבוד רב,?$/mi,  // Respectfully
      /^נשלח מה-(?:\s*.+)$/,  // Sent from
      /^נשלח מ-(?:\s*.+)$/,  // Sent from (alternative)
      /^בתודה,?$/mi,  // Thanks
      /^בתודה מראש,?$/mi,  // Thanks in advance
      /^בידידות,?$/mi,  // Friendly regards
      /^כל טוב,?$/mi,  // All the best
      /^בהצלחה,?$/mi,  // Good luck
      /^להתראות,?$/mi,  // See you
      /^שלח מ-(?:\s*.+)$/,  // Sent from (masculine)
      /^שלחה מ-(?:\s*.+)$/,  // Sent from (feminine)
      /^דרך (?:\s*.+)$/,  // Via/Through
      /^הודעה זו נשלחה מ-(?:\s*.+)$/,  // This message was sent from
      /^נשלח מאפליקציית (?:\s*.+)$/,  // Sent from application
    ]);
  }

  buildRe2(regexList) {
    return regexList.map((regex) => new this.SafeRegExp(regex));
  }
}

module.exports = new RegexList();