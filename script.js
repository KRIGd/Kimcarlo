const codeBlock = document.getElementById('codeBlock');
const lineNumbers = document.getElementById('lineNumbers');

function updateLineNumbers() {
  const lines = codeBlock.innerText.split('\n').length;
  lineNumbers.innerHTML = Array.from({length: lines}, (_, i) => `${i + 1}`).join('\n');
}

function copyCode() {
  navigator.clipboard.writeText(codeBlock.innerText).then(() => {
    alert("Code copied to clipboard!");
  });
}

function highlightActiveLine() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const textBefore = codeBlock.innerText.slice(0, range.startOffset);
  const activeLine = textBefore.split("\n").length;

  const lines = lineNumbers.innerText.split("\n");
  const updated = lines.map((line, i) =>
    (i + 1 === activeLine ? `> ${i + 1}` : `${i + 1}`)
  );
  lineNumbers.innerText = updated.join("\n");
}

function syncScroll() {
  lineNumbers.scrollTop = codeBlock.parentElement.scrollTop;
}

// === NEW FEATURE ===
// Paste your Arduino code here inside backticks (`...`)
const myArduinoCode = `
// CODES HERE! =)
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <IRremote.h>
#include <toneAC.h>
#include <avr/pgmspace.h>

// pins
int ledPins[10] = {2, 3, 4, 5, 6, 7, 8, 9, 11, 12};
int buzzer = 10; // toneAC pin
int IR_PIN = 13;

// hex
#define BTN_1 0x45
#define BTN_2 0x46
#define BTN_3 0x47
#define BTN_4 0x44
#define BTN_5 0x40
#define BTN_6 0x43
#define BTN_7 0x07
#define BTN_8 0x15
#define BTN_9 0x09
#define BTN_0 0x19
#define BTN_STAR 0x16
#define BTN_HASH 0x0D
#define BTN_OK 0x1C
#define BTN_UP 0x18
#define BTN_DOWN 0x52
#define BTN_LEFT 0x08
#define BTN_RIGHT 0x5A

// mga nota
#define NOTE_B0 31
#define NOTE_C1 33
#define NOTE_CS1 35
#define NOTE_D1 37
#define NOTE_DS1 39
#define NOTE_E1 41
#define NOTE_F1 44
#define NOTE_FS1 46
#define NOTE_G1 49
#define NOTE_GS1 52
#define NOTE_A1 55
#define NOTE_AS1 58
#define NOTE_B1 62
#define NOTE_C2 65
#define NOTE_CS2 69
#define NOTE_D2 73
#define NOTE_DS2 78
#define NOTE_E2 82
#define NOTE_F2 87
#define NOTE_FS2 93
#define NOTE_G2 98
#define NOTE_GS2 104
#define NOTE_A2 110
#define NOTE_AS2 117
#define NOTE_B2 123
#define NOTE_C3 131
#define NOTE_CS3 139
#define NOTE_D3 147
#define NOTE_DS3 156
#define NOTE_E3 165
#define NOTE_F3 175
#define NOTE_FS3 185
#define NOTE_G3 196
#define NOTE_GS3 208
#define NOTE_A3 220
#define NOTE_AS3 233
#define NOTE_B3 247
#define NOTE_C4 262
#define NOTE_CS4 277
#define NOTE_D4 294
#define NOTE_DS4 311
#define NOTE_E4 330
#define NOTE_F4 349
#define NOTE_FS4 370
#define NOTE_G4 392
#define NOTE_GS4 415
#define NOTE_A4 440
#define NOTE_AS4 466
#define NOTE_B4 494
#define NOTE_C5 523
#define NOTE_CS5 554
#define NOTE_D5 587
#define NOTE_DS5 622
#define NOTE_E5 659
#define NOTE_F5 698
#define NOTE_FS5 740
#define NOTE_G5 784
#define NOTE_GS5 831
#define NOTE_A5 880
#define NOTE_AS5 932
#define NOTE_B5 988

struct SongInfo
{
  const int *melody;
  const uint8_t *durations;
  int length;
};

const int deck_melody[] PROGMEM = {
    NOTE_F4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_F4, NOTE_D4, NOTE_E4, NOTE_F4,
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_A4, NOTE_G4, NOTE_F4, NOTE_E4, NOTE_D4,
    NOTE_F4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_F4, NOTE_D4, NOTE_E4, NOTE_F4,
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_A4, NOTE_G4, NOTE_F4, NOTE_E4, NOTE_D4};
const uint8_t deck_durations[] PROGMEM = {
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4, 4, 4};
const int deck_length = sizeof(deck_melody) / sizeof(int);

const int wish_melody[] PROGMEM = {
    NOTE_B3, NOTE_F4, NOTE_F4, NOTE_G4, NOTE_F4, NOTE_E4,
    NOTE_D4, NOTE_D4, NOTE_D4, NOTE_G4, NOTE_G4, NOTE_A4,
    NOTE_G4, NOTE_F4, NOTE_E4, NOTE_E4, NOTE_E4, NOTE_A4,
    NOTE_A4, NOTE_B4, NOTE_A4, NOTE_G4, NOTE_F4, NOTE_D4,
    NOTE_B3, NOTE_B3, NOTE_D4, NOTE_G4, NOTE_E4, NOTE_F4};
const uint8_t wish_durations[] PROGMEM = {
    4, 4, 8, 8, 8, 8,
    4, 4, 4, 4, 8, 8,
    8, 8, 4, 4, 4, 4,
    8, 8, 8, 8, 4, 4,
    8, 8, 4, 4, 4, 2};
const int wish_length = sizeof(wish_melody) / sizeof(int);

const int silent_melody[] PROGMEM = {NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4, NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4};
const uint8_t silent_durations[] PROGMEM = {4, 4, 4, 2, 4, 4, 4, 2};
const int silent_length = sizeof(silent_melody) / sizeof(int);

const int santa_melody[] PROGMEM = {
    NOTE_G4,
    NOTE_E4, NOTE_F4, NOTE_G4, NOTE_G4, NOTE_G4,
    NOTE_A4, NOTE_B4, NOTE_C5, NOTE_C5, NOTE_C5,
    NOTE_E4, NOTE_F4, NOTE_G4, NOTE_G4, NOTE_G4,
    NOTE_A4, NOTE_G4, NOTE_F4, NOTE_F4,
    NOTE_E4, NOTE_G4, NOTE_C4, NOTE_E4,
    NOTE_D4, NOTE_F4, NOTE_B3,
    NOTE_C4};
const uint8_t santa_durations[] PROGMEM = {
    8,
    8, 8, 4, 4, 4,
    8, 8, 4, 4, 4,
    8, 8, 4, 4, 4,
    8, 8, 4, 2,
    4, 4, 4, 4,
    4, 2, 4,
    1};
const int santa_length = sizeof(santa_melody) / sizeof(int);

const int jingle_melody[] PROGMEM = {
    NOTE_E4, NOTE_E4, NOTE_E4,
    NOTE_E4, NOTE_E4, NOTE_E4,
    NOTE_E4, NOTE_G4, NOTE_C4, NOTE_D4, NOTE_E4};
const uint8_t jingle_durations[] PROGMEM = {
    8, 8, 4,
    8, 8, 4,
    8, 8, 8, 8, 2};
const int jingle_length = sizeof(jingle_melody) / sizeof(int);

const int feliz_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_G4, NOTE_E4, NOTE_F4, NOTE_D4};
const uint8_t feliz_durations[] PROGMEM = {
    4, 4, 4, 4, 4, 4};
const int feliz_length = sizeof(feliz_melody) / sizeof(int);

const int joy_melody[] PROGMEM = {
    NOTE_D4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4, NOTE_G4};
const uint8_t joy_durations[] PROGMEM = {
    4, 4, 4, 4, 4, 4};
const int joy_length = sizeof(joy_melody) / sizeof(int);

const int angels_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_B4, NOTE_A4};
const uint8_t angels_durations[] PROGMEM = {
    4, 4, 4, 4, 4, 4};
const int angels_length = sizeof(angels_melody) / sizeof(int);

const int up_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t up_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int up_length = sizeof(up_melody) / sizeof(int);

const int frosty_melody[] PROGMEM = {
    NOTE_C4, NOTE_E4, NOTE_G4, NOTE_A4, NOTE_B4};
const uint8_t frosty_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int frosty_length = sizeof(frosty_melody) / sizeof(int);

const int oholy_melody[] PROGMEM = {
    NOTE_C4, NOTE_E4, NOTE_F4, NOTE_G4, NOTE_A4};
const uint8_t oholy_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int oholy_length = sizeof(oholy_melody) / sizeof(int);

const int away_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t away_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int away_length = sizeof(away_melody) / sizeof(int);

const int first_noel_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t first_noel_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int first_noel_length = sizeof(first_noel_melody) / sizeof(int);

const int hark_melody[] PROGMEM = {
    NOTE_G4, NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5};
const uint8_t hark_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int hark_length = sizeof(hark_melody) / sizeof(int);

const int ocome_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t ocome_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int ocome_length = sizeof(ocome_melody) / sizeof(int);

const int jinglebellrock_melody[] PROGMEM = {
    NOTE_E4, NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5};
const uint8_t jinglebellrock_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int jinglebellrock_length = sizeof(jinglebellrock_melody) / sizeof(int);

const int winterwonderland_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t winterwonderland_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int winterwonderland_length = sizeof(winterwonderland_melody) / sizeof(int);

const int letitsnow_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t letitsnow_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int letitsnow_length = sizeof(letitsnow_melody) / sizeof(int);

const int silverbells_melody[] PROGMEM = {
    NOTE_E4, NOTE_F4, NOTE_G4, NOTE_A4, NOTE_B4};
const uint8_t silverbells_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int silverbells_length = sizeof(silverbells_melody) / sizeof(int);

const int illbehome_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t illbehome_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int illbehome_length = sizeof(illbehome_melody) / sizeof(int);

const int whitechristmas_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t whitechristmas_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int whitechristmas_length = sizeof(whitechristmas_melody) / sizeof(int);

const int angelsrealms_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t angelsrealms_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int angelsrealms_length = sizeof(angelsrealms_melody) / sizeof(int);

const int gotellit_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t gotellit_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int gotellit_length = sizeof(gotellit_melody) / sizeof(int);

const int carolbells_melody[] PROGMEM = {
    NOTE_E4, NOTE_F4, NOTE_G4, NOTE_A4, NOTE_B4};
const uint8_t carolbells_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int carolbells_length = sizeof(carolbells_melody) / sizeof(int);

const int rudolph_melody[] PROGMEM = {
    NOTE_E4, NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5};
const uint8_t rudolph_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int rudolph_length = sizeof(rudolph_melody) / sizeof(int);

const int herecomesanta_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t herecomesanta_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int herecomesanta_length = sizeof(herecomesanta_melody) / sizeof(int);

const int alliwant_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t alliwant_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int alliwant_length = sizeof(alliwant_melody) / sizeof(int);

const int isawmommy_melody[] PROGMEM = {
    NOTE_E4, NOTE_F4, NOTE_G4, NOTE_A4, NOTE_B4};
const uint8_t isawmommy_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int isawmommy_length = sizeof(isawmommy_melody) / sizeof(int);

const int rockin_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t rockin_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int rockin_length = sizeof(rockin_melody) / sizeof(int);

const int chipmunk_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t chipmunk_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int chipmunk_length = sizeof(chipmunk_melody) / sizeof(int);

const int mustbesanta_melody[] PROGMEM = {
    NOTE_E4, NOTE_F4, NOTE_G4, NOTE_A4, NOTE_B4};
const uint8_t mustbesanta_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int mustbesanta_length = sizeof(mustbesanta_melody) / sizeof(int);

const int grandma_melody[] PROGMEM = {
    NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const uint8_t grandma_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int grandma_length = sizeof(grandma_melody) / sizeof(int);

const int hollyjolly_melody[] PROGMEM = {
    NOTE_G4, NOTE_A4, NOTE_B4, NOTE_C5, NOTE_D5};
const uint8_t hollyjolly_durations[] PROGMEM = {
    4, 4, 4, 4, 4};
const int hollyjolly_length = sizeof(hollyjolly_melody) / sizeof(int);

const SongInfo mode7_medley1[] = {
    {deck_melody, deck_durations, deck_length},
    {jingle_melody, jingle_durations, jingle_length},
    {feliz_melody, feliz_durations, feliz_length}};
const SongInfo mode7_medley2[] = {
    {joy_melody, joy_durations, joy_length},
    {angels_melody, angels_durations, angels_length},
    {up_melody, up_durations, up_length}};
const SongInfo mode7_medley3[] = {
    {santa_melody, santa_durations, santa_length},
    {wish_melody, wish_durations, wish_length},
    {frosty_melody, frosty_durations, frosty_length}};
const SongInfo *mode7_medleys[] = {mode7_medley1, mode7_medley2, mode7_medley3};
const int mode7_medleyCounts[] = {3, 3, 3};
const int mode7_medleyCount = 3;

// Mode 8: Gentle & Melodic (3 medleys)
const SongInfo mode8_medley1[] = {
    {silent_melody, silent_durations, silent_length},
    {oholy_melody, oholy_durations, oholy_length},
    {away_melody, away_durations, away_length}};
const SongInfo mode8_medley2[] = {
    {first_noel_melody, first_noel_durations, first_noel_length},
    {hark_melody, hark_durations, hark_length},
    {ocome_melody, ocome_durations, ocome_length}};
const SongInfo mode8_medley3[] = {
    {silent_melody, silent_durations, silent_length},
    {wish_melody, wish_durations, wish_length},
    {oholy_melody, oholy_durations, oholy_length}};
const SongInfo *mode8_medleys[] = {mode8_medley1, mode8_medley2, mode8_medley3};
const int mode8_medleyCounts[] = {3, 3, 3};
const int mode8_medleyCount = 3;

// Mode 9: Mixed Feel (3 medleys)
const SongInfo mode9_medley1[] = {
    {jinglebellrock_melody, jinglebellrock_durations, jinglebellrock_length},
    {winterwonderland_melody, winterwonderland_durations, winterwonderland_length},
    {letitsnow_melody, letitsnow_durations, letitsnow_length}};
const SongInfo mode9_medley2[] = {
    {silverbells_melody, silverbells_durations, silverbells_length},
    {illbehome_melody, illbehome_durations, illbehome_length},
    {whitechristmas_melody, whitechristmas_durations, whitechristmas_length}};
const SongInfo mode9_medley3[] = {
    {angelsrealms_melody, angelsrealms_durations, angelsrealms_length},
    {gotellit_melody, gotellit_durations, gotellit_length},
    {carolbells_melody, carolbells_durations, carolbells_length}};
const SongInfo *mode9_medleys[] = {mode9_medley1, mode9_medley2, mode9_medley3};
const int mode9_medleyCounts[] = {3, 3, 3};
const int mode9_medleyCount = 3;

// Mode 10: Kids/Fun Oriented (3 medleys)
const SongInfo mode10_medley1[] = {
    {rudolph_melody, rudolph_durations, rudolph_length},
    {herecomesanta_melody, herecomesanta_durations, herecomesanta_length},
    {alliwant_melody, alliwant_durations, alliwant_length}};
const SongInfo mode10_medley2[] = {
    {isawmommy_melody, isawmommy_durations, isawmommy_length},
    {rockin_melody, rockin_durations, rockin_length},
    {chipmunk_melody, chipmunk_durations, chipmunk_length}};
const SongInfo mode10_medley3[] = {
    {mustbesanta_melody, mustbesanta_durations, mustbesanta_length},
    {grandma_melody, grandma_durations, grandma_length},
    {hollyjolly_melody, hollyjolly_durations, hollyjolly_length}};
const SongInfo *mode10_medleys[] = {mode10_medley1, mode10_medley2, mode10_medley3};
const int mode10_medleyCounts[] = {3, 3, 3};
const int mode10_medleyCount = 3;

int mode = 0;
int song = 0;
unsigned long prevMillis = 0;
int stepIndex = 0;
bool ledState = LOW;
bool isOff = false;

int currentMedleyIndex = 0;
int currentNoteIndex = 0;
unsigned long noteStartTime = 0;
int currentNoteDuration = 0;

bool showingMembers = false;
bool showingTitle = false;

const char groupMembers[4][21] PROGMEM = {
    "KIM CARLO TOLENTINO  ",
    "JUSTINE LAURENCE QUIZON",
    "JOHN LLOYD RONCAL    ",
    "JOSHUA CARL NARTEA   "};

bool autoMode = false;
unsigned long autoModeStart = 0;
const unsigned long autoModeDuration = 180000;
int autoModeIndex = 0;
bool autoModeRandom = false;

unsigned long modeTimerStart = 0;
const unsigned long modeTimerDuration = 180000; // eto yung timer
bool modeTimerActive = false;

LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup()
{
  Serial.begin(9600);

  for (int i = 0; i < 10; i++)
    pinMode(ledPins[i], OUTPUT);

  IrReceiver.begin(IR_PIN, ENABLE_LED_FEEDBACK);

  lcd.init();
  lcd.backlight();

  trainStationBeep();

  lcdPrint(F("Mode: OFF"));
}

void loop()
{
  handleIR();

  if (modeTimerActive && (millis() - modeTimerStart >= modeTimerDuration))
  {
    modeTimerStart = millis();
    mode = (mode % 10) + 1; // cycle 1 to 10
    setMode(mode);
  }

  if (autoMode)
  {
    unsigned long elapsed = millis() - autoModeStart;
    if (elapsed >= autoModeDuration)
    {
      autoModeStart = millis();
      if (autoModeRandom)
      {
        autoModeIndex = random(1, 11);
      }
      else
      {
        autoModeIndex = (autoModeIndex % 10) + 1;
      }
      setMode(autoModeIndex);
    }
    int secondsLeft = (autoModeDuration - elapsed) / 1000;
    lcd.setCursor(0, 3);
    lcd.print(F("Time left: "));
    if (secondsLeft < 10)
      lcd.print('0');
    lcd.print(secondsLeft);
    lcd.print(F("s   "));
  }

  static bool displayedMembers = false;
  static bool displayedTitle = false;

  if (!isOff)
  {
    if (showingMembers)
    {
      if (!displayedMembers)
      {
        displayGroupMembers(true);
        displayedMembers = true;
        displayedTitle = false;
      }
      if (mode >= 1 && mode <= 6)
        runLEDs();
      else if (mode >= 7 && mode <= 10)
      {
        runSong();
        runLEDsSongSync();
      }
    }
    else if (showingTitle)
    {
      if (!displayedTitle)
      {
        displayProjectTitle(true);
        displayedTitle = true;
        displayedMembers = false;
      }
      if (mode >= 1 && mode <= 6)
        runLEDs();
      else if (mode >= 7 && mode <= 10)
      {
        runSong();
        runLEDsSongSync();
      }
    }
    else
    {
      displayedMembers = false;
      displayedTitle = false;

      if (mode >= 1 && mode <= 6)
      {
        runLEDs();
        toneAC(0, 0);
      }
      else if (mode >= 7 && mode <= 10)
      {
        runSong();
        runLEDsSongSync();
      }
      else
      {
        for (int i = 0; i < 10; i++)
          digitalWrite(ledPins[i], LOW);
        toneAC(0, 0);
      }
    }
  }
  else
  {
    for (int i = 0; i < 10; i++)
      digitalWrite(ledPins[i], LOW);
    toneAC(0, 0);
  }
}

void handleIR()
{
  if (IrReceiver.decode())
  {
    uint8_t cmd = IrReceiver.decodedIRData.command;
    Serial.print(F("IR Command: "));
    Serial.println(cmd, HEX);

    if (cmd != BTN_STAR && cmd != BTN_HASH && cmd != BTN_OK)
    {
      if (showingMembers || showingTitle)
      {
        showingMembers = false;
        showingTitle = false;
        lcdPrintMode();
      }
    }

    if (cmd == BTN_OK)
    {
      if (isOff)
      {
        isOff = false;
        if (mode == 0)
          setMode(1);
        else
          setMode(mode);
        showingMembers = false;
        showingTitle = false;
      }
      else
      {
        stopAll();
        isOff = true;
        autoMode = false;
        modeTimerActive = false;
        lcd.clear();
        lcd.setCursor(0, 1);
        lcd.print(F("OFF"));
        showingMembers = false;
        showingTitle = false;
      }
      IrReceiver.resume();
      return;
    }
    else if (cmd == BTN_LEFT || cmd == BTN_RIGHT)
    {
      if (isOff)
      {
        IrReceiver.resume();
        return;
      }
      autoMode = false;
      modeTimerActive = true;
      modeTimerStart = millis();

      if (cmd == BTN_RIGHT)
      {
        mode = (mode % 10) + 1;
      }
      else
      {
        mode--;
        if (mode < 1)
          mode = 10;
      }
      setMode(mode);
    }
    else if (cmd == BTN_UP || cmd == BTN_DOWN)
    {
      if (isOff)
      {
        IrReceiver.resume();
        return;
      }
      autoMode = true;
      modeTimerActive = false;
      autoModeStart = millis();
      autoModeRandom = true;
      autoModeIndex = random(1, 11);
      setMode(autoModeIndex);
    }
    else if (cmd == BTN_STAR)
    {
      if (isOff)
      {
        IrReceiver.resume();
        return;
      }
      autoMode = false;
      modeTimerActive = false;
      if (showingMembers)
      {
        showingMembers = false;
        lcdPrintMode();
      }
      else
      {
        showingMembers = true;
        showingTitle = false;
      }
    }
    else if (cmd == BTN_HASH)
    {
      if (isOff)
      {
        IrReceiver.resume();
        return;
      }
      autoMode = false;
      modeTimerActive = false;
      if (showingTitle)
      {
        showingTitle = false;
        lcdPrintMode();
      }
      else
      {
        showingTitle = true;
        showingMembers = false;
      }
    }
    else if (!isOff)
    {
      autoMode = false;
      if (cmd == BTN_1)
        setMode(1);
      else if (cmd == BTN_2)
        setMode(2);
      else if (cmd == BTN_3)
        setMode(3);
      else if (cmd == BTN_4)
        setMode(4);
      else if (cmd == BTN_5)
        setMode(5);
      else if (cmd == BTN_6)
        setMode(6);
      else if (cmd == BTN_7)
        setMode(7);
      else if (cmd == BTN_8)
        setMode(8);
      else if (cmd == BTN_9)
        setMode(9);
      else if (cmd == BTN_0)
        setMode(10);
    }

    IrReceiver.resume();
  }
}

void setMode(int newMode)
{
  mode = newMode;
  stepIndex = 0;
  isOff = false;
  song = 0;

  currentMedleyIndex = 0;
  currentNoteIndex = 0;
  noteStartTime = 0;
  currentNoteDuration = 0;

  if (mode >= 7 && mode <= 10)
  {
    song = mode - 6;
  }
  lcdPrintMode();
  if (song == 0)
    toneAC(0, 0);
}

void lcdPrint(const __FlashStringHelper *msg)
{
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(F("Xmas Light Show"));
  lcd.setCursor(0, 1);
  lcd.print(msg);
  lcd.setCursor(0, 2);
  if (song == 0)
    lcd.print(F("Song: None"));
  else if (song == 1)
    lcd.print(F("Song: Deck the Halls"));
  else if (song == 2)
    lcd.print(F("Song: We Wish You"));
  else if (song == 3)
    lcd.print(F("Song: Silent Night"));
  else if (song == 4)
    lcd.print(F("Song: Santa Claus"));
}

void lcdPrintMode()
{
  char buf[21];
  snprintf(buf, sizeof(buf), "Mode: %d", mode);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(F("Xmas Light Show"));
  lcd.setCursor(0, 1);
  lcd.print(buf);
  lcd.setCursor(0, 2);
  if (song == 0)
  {
    lcd.print(F("Song: None"));
  }
  else if (song == 1)
  {
    lcd.print(F("Song: Deck the Halls"));
  }
  else if (song == 2)
  {
    lcd.print(F("Song: We Wish You"));
  }
  else if (song == 3)
  {
    lcd.print(F("Song: Silent Night"));
  }
  else if (song == 4)
  {
    lcd.print(F("Song: Santa Claus"));
  }
  else
  {
    lcd.print(F("Song: Unknown"));
  }
}

void displayGroupMembers(bool clearFirst)
{
  if (clearFirst)
    lcd.clear();
  for (int i = 0; i < 4; i++)
  {
    lcd.setCursor(0, i);
    char buf[21];
    memcpy_P(buf, groupMembers[i], 20);
    buf[20] = '\0';
    lcd.print(buf);
  }
}

void displayProjectTitle(bool clearFirst)
{
  if (clearFirst)
    lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(F("ARDUINO CHRISTMAS"));
  lcd.setCursor(0, 1);
  lcd.print(F("TREE PROJECT BY"));
  lcd.setCursor(0, 2);
  lcd.print(F("THE PSAU"));
  lcd.setCursor(0, 3);
  lcd.print(F("BSCPE STUDENTS"));
}

void trainStationBeep()
{
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print(F("Merry Christmas"));
  lcd.setCursor(0, 1);
  lcd.print(F("Starting..."));
  int beepNotes[] = {NOTE_A4, NOTE_B4, NOTE_C5, NOTE_B4, NOTE_A4};
  int beepDurations[] = {150, 150, 300, 150, 150};
  for (int i = 0; i < 5; i++)
  {
    toneAC(beepNotes[i], beepDurations[i]);
    for (int j = 0; j < 10; j++)
    {
      digitalWrite(ledPins[j], (j == i * 2 || j == i * 2 + 1) ? HIGH : LOW);
    }
    delay(beepDurations[i] + 50);
  }
  toneAC(0, 0);
  for (int i = 0; i < 10; i++)
    digitalWrite(ledPins[i], LOW);
  delay(500);
  lcdPrint(F("Mode: OFF"));
}

void runLEDs()
{
  unsigned long now = millis();
  switch (mode)
  {
  case 1:
    for (int i = 0; i < 10; i++)
      digitalWrite(ledPins[i], HIGH);
    break;
  case 2:
    prevMillis = now;
    for (int i = 0; i < 10; i++)
      digitalWrite(ledPins[i], LOW);
    int g = stepIndex % 4;
    int startLed = g * 3;
    int endLed = startLed + 2;
    if (g == 3)
      endLed = 9;
    for (int i = startLed; i <= endLed; i++)
      digitalWrite(ledPins[i], HIGH);
    stepIndex++;
  }
  break;
case 3:
  if (now - prevMillis >= 500)
  {
    prevMillis = now;
    ledState = !ledState;
    for (int i = 0; i < 10; i++)
      digitalWrite(ledPins[i], ledState);
  }
  break;
case 4:
  if (now - prevMillis >= 300)
  {
    prevMillis = now;
    static int dir = 1;
    static int groupIndex = 0;
    for (int i = 0; i < 10; i++)
      digitalWrite(ledPins[i], LOW);
    int startLed = groupIndex * 3;
    int endLed = startLed + 2;
    if (groupIndex == 3)
      endLed = 9;
    for (int i = startLed; i <= endLed; i++)
      digitalWrite(ledPins[i], HIGH);
    groupIndex += dir;
    if (groupIndex >= 3)
      dir = -1;
    else if (groupIndex <= 0)
      dir = 1;
  }
  break;
case 5:
  if (now - prevMillis >= 150)
  {
    prevMillis = now;
    for (int i = 0; i < 10; i++)
    {
      digitalWrite(ledPins[i], random(0, 10) > 7 ? HIGH : LOW);
    }
  }
  break;
case 6:
  if (now - prevMillis >= 300)
  {
    prevMillis = now;
    for (int i = 0; i < 10; i++)
      digitalWrite(ledPins[i], random(0, 2));
  }
  break;
default:
  for (int i = 0; i < 10; i++)
    digitalWrite(ledPins[i], LOW);
  break;
}
}

void runSong()
{
  if (song == 0)
    return;
  unsigned long now = millis();

  const SongInfo *currentMedley = nullptr;
  int medleyLength = 0;

  switch (song)
  {
  case 1:
    currentMedley = mode7_medleys[currentMedleyIndex];
    medleyLength = mode7_medleyCounts[currentMedleyIndex];
    break;
  case 2:
    currentMedley = mode8_medleys[currentMedleyIndex];
    medleyLength = mode8_medleyCounts[currentMedleyIndex];
    break;
  case 3:
    currentMedley = mode9_medleys[currentMedleyIndex];
    medleyLength = mode9_medleyCounts[currentMedleyIndex];
    break;
  case 4:
    currentMedley = mode10_medleys[currentMedleyIndex];
    medleyLength = mode10_medleyCounts[currentMedleyIndex];
    break;
  default:
    toneAC(0, 0);
    return;
  }

  int totalNotes = 0;
  for (int i = 0; i < medleyLength; i++)
  {
    totalNotes += currentMedley[i].length;
  }

  if (currentNoteIndex >= totalNotes)
  {
    currentNoteIndex = 0;
    currentMedleyIndex++;
    int maxMedleyCount = 0;
    switch (song)
    {
    case 1:
      maxMedleyCount = mode7_medleyCount;
      break;
    case 2:
      maxMedleyCount = mode8_medleyCount;
      break;
    case 3:
      maxMedleyCount = mode9_medleyCount;
      break;
    case 4:
      maxMedleyCount = mode10_medleyCount;
      break;
    }
    if (currentMedleyIndex >= maxMedleyCount)
      currentMedleyIndex = 0;
    return;
  }

  int idx = currentNoteIndex;
  int songIdx = 0;
  while (songIdx < medleyLength && idx >= currentMedley[songIdx].length)
  {
    idx -= currentMedley[songIdx].length;
    songIdx++;
  }
  if (songIdx >= medleyLength)
    songIdx = 0;

  int note = pgm_read_word(&currentMedley[songIdx].melody[idx]);
  uint8_t dur = pgm_read_byte(&currentMedley[songIdx].durations[idx]);
  int durMs = 1000 / dur;

  if (currentNoteIndex == 0 || now - noteStartTime >= currentNoteDuration + 20)
  {
    if (note == 0)
      toneAC(0, 0);
    else
      toneAC(note, durMs * 0.9);

    currentNoteDuration = durMs;
    noteStartTime = now;
    currentNoteIndex++;
  }
}

void runLEDsSongSync()
{
  for (int i = 0; i < 10; i++)
    digitalWrite(ledPins[i], LOW);
  int group = currentNoteIndex % 4;
  switch (group)
  {
  case 0:
    for (int i = 0; i <= 2; i++)
      digitalWrite(ledPins[i], HIGH);
    break;
  case 1:
    for (int i = 3; i <= 5; i++)
      digitalWrite(ledPins[i], HIGH);
    break;
  case 2:
    for (int i = 6; i <= 8; i++)
      digitalWrite(ledPins[i], HIGH);
    break;
  case 3:
    for (int i = 7; i <= 9; i++)
      digitalWrite(ledPins[i], HIGH);
    break;
  }
}

void stopAll()
{
  mode = 0;
  song = 0;
  currentNoteIndex = 0;
  currentMedleyIndex = 0;
  toneAC(0, 0);
  for (int i = 0; i < 10; i++)
    digitalWrite(ledPins[i], LOW);
  lcdPrint(F("Mode: OFF"));
}

//BY KIM CARLO TOLENTINO
`;

window.addEventListener("DOMContentLoaded", () => {
  codeBlock.textContent = myArduinoCode;   // raw text (preserves < >)
  Prism.highlightElement(codeBlock);       // syntax highlighting
  updateLineNumbers();                     // generate numbers
  codeBlock.parentElement.addEventListener("scroll", syncScroll);
});

codeBlock.addEventListener("mouseup", highlightActiveLine);
codeBlock.addEventListener("keyup", highlightActiveLine);
