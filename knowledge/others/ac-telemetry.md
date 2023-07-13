---
title: Assetto Corsa telemetry
---

> Some parts has been redacted as they were part of the Client's existing codebase.

Back in the day, I was exploring how to gather telemetry data from Assetto Corsa game with Node.js.

## ac-remote-telemetry-client

`ac-remote-telemetry-client` is a package for Node.js that allows us to access telemetry data while the race is running. It's a simple library that can handle only three types of events:

- `HANDSHAKER_RESPONSE`: fired once the race starts
- `RT_CAR_INFO`: a continuous stream of telemetry data throughout the race
- `RT_LAP`: an event I’m not sure about since it didn't seem to fire when I finished a lap in my gameplay

The library uses [AC UDP Sockets](https://docs.google.com/document/d/1KfkZiIluXZ6mMhLWfDX1qAGbvhGRC3ZUzjVIt5FQpp4/pub) to gather telemetry data.

### Issues

#### Huge datasets

The main issue with that library is that **we end up with an enormous dataset per race**:

Logging one lap on _Monza Junior_ (using one car, in practice mode, and taking around one minute of racing), it generated around 90MB of logs, which is roughly 32k objects of `RT_CAR_INFO` data. It's a lot of data, and we may need to narrow down the information we want to track. We could also try fixing the Unicode issues to shrink down the log size. Nonetheless, we will still end up with an enormous dataset.

#### Performance

Second of all, `ac-remote-telemetry-client` is written in pure Node.js, so its performance might be questionable.

#### Unicode support

This package has issues with Unicode characters appended to different strings in the event payload.

#### Lack of maintenance

You probably want to fork this library instead of using it as is. It’s pretty limited and has some evident bugs anyway.

#### No TypeScript

🤷‍♂️

### Format

```
// HANDSHAKER_RESPONSE
{
    "carName": "bmw_m3_e30_gra%",
    "driverName": "pankoscielniak%\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000",
    "identifier": 4242,
    "version": 1,
    "trackName": "ks_monza66%\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000ᰀ㯻\u0000\u0000\u0000\u0000\u0000\u0000̐Ø\u0000롣翷",
    "trackConfig": "ks_monza66%붯\u0000\u0000Ȱ㲔㽿슬믌\u0000\u0000ᇇ㶯ꣴ믾ฤ뽿\u0000\u0000됳쌙㱬샼鈚䍂\u0000㾀\u0003㾀\u0003㾀\u0003㾀\u0003㾀"
}
```

```
// RT_CAR_INFO - constant stream of telemetry data
{
    "identifier": "a3",
    "size": 328,
    "speedKmh": 209.45108032226562,
    "speedMph": 130.14688110351562,
    "speedMs": 58.18085861206055,
    "isAbsEnabled": 1,
    "isAbsInAction": 0,
    "isTcInAction": 0,
    "isTcEnabled": 1,
    "isInPit": 0,
    "isEngineLimiterOn": 0,
    "accGVertical": 0.021842923015356064,
    "accGHorizontal": -0.013832904398441315,
    "accGFrontal": 0.09118304401636124,
    "lapTime": 12,
    "lastLap": 77288,
    "bestLap": 77288,
    "lapCount": 1,
    "gas": 1,
    "brake": 0,
    "clutch": 1,
    "engineRPM": 6832.69091796875,
    "steer": 0,
    "gear": 6,
    "cgHeight": 0.46384382247924805,
    "wheelAngularSpeed1": 176.02420043945312,
    "wheelAngularSpeed2": 176.10159301757812,
    "wheelAngularSpeed3": 178.87928771972656,
    "wheelAngularSpeed4": 178.87928771972656,
    "slipAngle1": 0.17060920596122742,
    "slipAngle2": -0.21948684751987457,
    "slipAngle3": 0.2603016197681427,
    "slipAngle4": -0.20934495329856873,
    "slipAngleContactPatch1": 0,
    "slipAngleContactPatch2": 0,
    "slipAngleContactPatch3": 0,
    "slipAngleContactPatch4": 0,
    "slipRatio1": -0.0005106340395286679,
    "slipRatio2": -0.0004582302353810519,
    "slipRatio3": 0.01538607757538557,
    "slipRatio4": 0.015213177539408207,
    "tyreSlip1": 0,
    "tyreSlip2": 0,
    "tyreSlip3": 0,
    "tyreSlip4": 0,
    "ndSlip1": 0.0502113401889801,
    "ndSlip2": 0.0415034256875515,
    "ndSlip3": 0.11123000830411911,
    "ndSlip4": 0.11038371920585632,
    "load1": 2331.21728515625,
    "load2": 2025.2103271484375,
    "load3": 3270.299560546875,
    "load4": 2940.892578125,
    "Dy1": 1.4936554431915283,
    "Dy2": 1.5226759910583496,
    "Dy3": 1.391696810722351,
    "Dy4": 1.4064825773239136,
    "Mz1": 7.524242877960205,
    "Mz2": -5.501704216003418,
    "Mz3": 3.489809989929199,
    "Mz4": -4.5952253341674805,
    "tyreDirtyLevel1": 0,
    "tyreDirtyLevel2": 0,
    "tyreDirtyLevel3": 0,
    "tyreDirtyLevel4": 0,
    "camberRAD1": -0.07260885834693909,
    "camberRAD2": -0.07224313169717789,
    "camberRAD3": -0.05090253800153732,
    "camberRAD4": -0.052508238703012466,
    "tyreRadius1": 0.32249999046325684,
    "tyreRadius2": 0.32249999046325684,
    "tyreRadius3": 0.32249999046325684,
    "tyreRadius4": 0.32249999046325684,
    "tyreLoadedRadius1": 0.31635862588882446,
    "tyreLoadedRadius2": 0.3164980113506317,
    "tyreLoadedRadius3": 0.31301218271255493,
    "tyreLoadedRadius4": 0.3135954439640045,
    "suspensionHeight1": 0.01436007022857666,
    "suspensionHeight2": 0.015252888202667236,
    "suspensionHeight3": 0.032725293189287186,
    "suspensionHeight4": 0.03290017321705818,
    "carPositionNormalized": 0.0010370276868343353,
    "carSlope": 0,
    "carCoordinatesX": -176.47535705566406,
    "carCoordinatesY": -6.580474376678467,
    "carCoordinatesZ": 102.81858825683594
  },
```

```
// RT_LAP - to be determined
```

## Brand new solution

I don’t have much to say about writing a telemetry scraper from scratch. However, there are two key considerations to keep in mind.

You should use a highly performant programming language to develop a scraping module and use the Node.js bindings to use it within your app. From my experiences, I can recommend Rust or Golang. Both are designed to perform well for low-level, resources-needy tasks.

Using C++ will be fine as well, however it’s a lower-level language with a steeper learning curve.

In any case, it's important to focus on defining a clear set of what telemetry data should be gathered and skip anything else. This way, you can keep the output as small as possible.

## Conclusions

It seems that there are potential paths forward for the telemetry gathering:

- use an existing `npm` package and evaluate its performance and suitability for the project's needs. If what the package provides is sufficient, it could be forked and with necessary modifications added, including the addition of TypeScript and handling Race Start, Race End, and Race Lap event
- write the telemetry gathering module from scratch in performance-oriented programming language.
  - For Rust, there exist a library (or _crate_ in Rust’s lingo) for geometry handling
  - For C++ this approach may require additional effort due to some technical nitpicks and the use of C*++ Boost* library.

Regardless of the chosen path, the team should add data normalisation and usage of `protobuf` or similar for transferring the datasets.

## Resources

- [AC Shared Memory Reference](https://assettocorsamods.net/threads/doc-shared-memory-reference.58/)
- [Assetto Corsa Shared Memory Example App](https://github.com/mdjarv/assettocorsasharedmemory/tree/master) written in C#
  - might get handy for developing your own solution

---

## Shared Memory research dump

```cpp

// **SHARED MEMORY STRUCTS**

#pragma once

typedef int AC_STATUS;

#define AC_OFF 0
#define AC_REPLAY 1
#define AC_LIVE 2
#define AC_PAUSE 3

typedef int AC_SESSION_TYPE;

#define AC_UNKNOWN -1
#define AC_PRACTICE 0
#define AC_QUALIFY 1
#define AC_RACE 2
#define AC_HOTLAP 3
#define AC_TIME_ATTACK 4
#define AC_DRIFT 5
#define AC_DRAG 6

typedef int AC_FLAG_TYPE;

#define AC_NO_FLAG 0
#define AC_BLUE_FLAG 1
#define AC_YELLOW_FLAG 2
#define AC_BLACK_FLAG 3
#define AC_WHITE_FLAG 4
#define AC_CHECKERED_FLAG 5
#define AC_PENALTY_FLAG 6

#pragma pack(push)
#pragma pack(4)

struct SPageFilePhysics
{
int packetId = 0;
float gas = 0;
float brake = 0;
float fuel = 0;
int gear = 0;
int rpms = 0;
float steerAngle = 0;
float speedKmh = 0;
float velocity[3];
float accG[3];
float wheelSlip[4];
float wheelLoad[4];
float wheelsPressure[4];
float wheelAngularSpeed[4];
float tyreWear[4];
float tyreDirtyLevel[4];
float tyreCoreTemperature[4];
float camberRAD[4];
float suspensionTravel[4];
float drs = 0;
float tc = 0;
float heading = 0;
float pitch = 0;
float roll = 0;
float cgHeight;
float carDamage[5];
int numberOfTyresOut = 0;
int pitLimiterOn = 0;
float abs = 0;
float kersCharge = 0;
float kersInput = 0;
int autoShifterOn = 0;
float rideHeight[2];
float turboBoost = 0;
float ballast = 0;
float airDensity = 0;
};


struct SPageFileGraphic
{
int packetId = 0;
AC_STATUS status = AC_OFF;
AC_SESSION_TYPE session = AC_PRACTICE;
wchar_t currentTime[15];
wchar_t lastTime[15];
wchar_t bestTime[15];
wchar_t split[15];
int completedLaps = 0;
int position = 0;
int iCurrentTime = 0;
int iLastTime = 0;
int iBestTime = 0;
float sessionTimeLeft = 0;
float distanceTraveled = 0;
int isInPit = 0;
int currentSectorIndex = 0;
int lastSectorTime = 0;
int numberOfLaps = 0;
wchar_t tyreCompound[33];

float replayTimeMultiplier = 0;
float normalizedCarPosition = 0;
float carCoordinates[3];
float penaltyTime = 0;
AC_FLAG_TYPE flag = AC_NO_FLAG;
int idealLineOn = 0;
int isInPitLane = 0;

float surfaceGrip = 0;
};


struct SPageFileStatic
{
wchar_t smVersion[15];
wchar_t acVersion[15];
// session static info
int numberOfSessions = 0;
int numCars = 0;
wchar_t carModel[33];
wchar_t track[33];
wchar_t playerName[33];
wchar_t playerSurname[33];
wchar_t playerNick[33];
int sectorCount = 0;

// car static info
float maxTorque = 0;
float maxPower = 0;
int maxRpm = 0;
float maxFuel = 0;
float suspensionMaxTravel[4];
float tyreRadius[4];
float maxTurboBoost = 0;

float airTemp = 0;
float roadTemp = 0;
bool penaltiesEnabled = false;

float aidFuelRate = 0;
float aidTireRate = 0;
float aidMechanicalDamage = 0;
bool aidAllowTyreBlankets = false;
float aidStability = 0;
bool aidAutoClutch = false;
bool aidAutoBlip = false;
};

#pragma pack(pop)


// **SHARED MEMORY NAMES**

physics : acpmf_physics
graphics : acpmf_graphics
static : acpmf_static
```
