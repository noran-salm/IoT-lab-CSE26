
#include <WiFi.h>
#include <WebSocketsClient.h>

WebSocketsClient wsc;

const char* ssid = "WE_693E45";
const char* pass = "dfcbccb3";

#define SERVER_IP "192.168.100.5"
#define PORT 3000
#define URL "/"
#define LED_PIN 4

void webSocketEvent(WStype_t type, uint8_t *data, size_t length) {
    switch (type) {

        case WStype_CONNECTED:
            Serial.println("Connected to WebSocket server");
            break;

        case WStype_DISCONNECTED:
            Serial.println("Disconnected from WebSocket server");
            break;

        case WStype_TEXT: {
            String msg = "";

            for (size_t i = 0; i < length; i++) {
                msg += (char)data[i];
            }

            int brightness = msg.toInt();
            brightness = constrain(brightness, 0, 255);

            analogWrite(LED_PIN, brightness);

            Serial.print("Brightness: ");
            Serial.println(brightness);
            break;
        }

        default:
            break;
    }
}

void setup() {
    Serial.begin(115200);

    pinMode(LED_PIN, OUTPUT);
    analogWrite(LED_PIN, 0);

    WiFi.begin(ssid, pass);

    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }

    Serial.println();
    Serial.print("ESP32 IP address: ");
    Serial.println(WiFi.localIP());

    wsc.begin(SERVER_IP, PORT, URL);
    wsc.onEvent(webSocketEvent);
    wsc.setReconnectInterval(5000);
}

void loop() {
    wsc.loop();
}
