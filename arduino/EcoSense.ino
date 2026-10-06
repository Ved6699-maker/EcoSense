/*
 EcoSense - Arduino starter firmware.
 Analog sensor examples: air quality -> A0, light -> A1, noise -> A2.
 Add your DHT11/DHT22 library later for temperature and humidity.
*/
#define AIR_PIN A0
#define LIGHT_PIN A1
#define NOISE_PIN A2
void setup(){Serial.begin(9600);pinMode(AIR_PIN,INPUT);pinMode(LIGHT_PIN,INPUT);pinMode(NOISE_PIN,INPUT);}
void loop(){int airRaw=analogRead(AIR_PIN);int lightRaw=analogRead(LIGHT_PIN);int noiseRaw=analogRead(NOISE_PIN);Serial.print("{\"air_raw\":");Serial.print(airRaw);Serial.print(",\"light_raw\":");Serial.print(lightRaw);Serial.print(",\"noise_raw\":");Serial.print(noiseRaw);Serial.println("}");delay(2000);}