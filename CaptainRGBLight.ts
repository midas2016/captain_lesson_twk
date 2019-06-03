/**
 * CaptainRGBLight package
 */

enum CaptainRGBColors {
    //% block=red
    Red = 1,
    //% block=orange
    Orange = 2,
    //% block=yellow
    Yellow = 3,
    //% block=green
    Green = 4,
    //% block=blue
    Blue = 5,
    //% block=indigo
    Indigo = 6,
    //% block=violet
    Violet = 7,
    //% block=purple
    Purple = 8,
    //% block=white
    White = 9,
    Black = 10
}

/**
 * CaptainRGBLight package
 */

enum CaptainTestColors {
    //% block=red
    Red = 1,
    //% block=yellow
    Yellow = 2,
    //% block=green
    Green = 3,
    //% block=tblue
    TBlue = 4,
    //% block=blue
    Blue = 5,
    //% block=purple
    Purple = 6,
}

 enum CaptainLights {
    //% block="Light 1"
    Light1 = 0x00,
    //% block="Light 2"
    Light2 = 0x01,
    //% block="Light 3"
    Light3 = 0x02,
    //% block="Light 4"
     Light4 = 0x03,
    //% block="Light 5"
     Light5 = 0x04,
    //% block="Light 6"
     Light6 = 0x05,
    //% block="All"
     All = 0x06
}

enum CaptainLightsBelt {
        //% block="Light 1"
        Light1 = 0x00,
        //% block="Light 2"
        Light2 = 0x01,
        //% block="Light 3"
        Light3 = 0x02,
        //% block="Light 4"
         Light4 = 0x03,
        //% block="Light 5"
         Light5 = 0x04,
        //% block="Light 6"
        Light6 = 0x05,
        //% block="Light 7"
        Light7 = 0x06,
        //% block="Light 8"
        Light8 = 0x07,
        //% block="Light 9"
        Light9 = 0x08,
        //% block="Light 10"
        Light10 = 0x09,
        //% block="All"
        All = 0x0A
}

/**
 * Different modes for RGB or RGB+W RGBLight QbitRGBColors
 */
enum CaptainRGBPixelMode {
    //% block="RGB (GRB format)"
    RGB = 0,
    //% block="RGB+W"
    RGBW = 1,
    //% block="RGB (RGB format)"
    RGB_RGB = 2
}

/**
 * QbitRGBLight Functions
 */
namespace CaptainRGBLight {
    //% shim=sendBufferAsm
    //% parts="QbitRGBLight"
    function sendBuffer(buf: Buffer, pin: DigitalPin) {

    }

    /**
    * A LHQbitRGBLight class
    */
    export class LHcaptainRGBLight {
        buf: Buffer;
        pin: DigitalPin;
        // TODO: encode as bytes instead of 32bit
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: CaptainRGBPixelMode;

        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }

        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
            // don't yield to avoid races on initialization
        }

        setBeltPixelColor(pixeloffset: number, rgb: CaptainRGBColors): void {
            if (pixeloffset == 10)//全部
            {
                for (let i = 0; i < this._length; i++)
                {
                    this.setPixelRGB(i, rgb);     
                }
            }
            else
            {
                this.setPixelRGB(pixeloffset * 3, rgb);
                this.setPixelRGB(pixeloffset * 3 + 1, rgb);
                this.setPixelRGB(pixeloffset*3 + 2, rgb);
            }
            
        }

        setBeltPixelColorRGBSeven(offset: number, rgb: Array<number>) { 

            let red = rgb[0], green = rgb[1], blue = rgb[2], c = rgb[3], hsv = rgb[4];

            if (c > 2200 && red > 65 && green > 65 && blue > 65) {
                this._setBeltPixelColorRGBSeven(offset, 255, 255, 255);
                return;
            } else if (c > 800) {       
                if ( ( 0<=hsv && hsv < 8 ) || ( hsv > 335 && hsv <=360 ) ) { //红色
                    this._setBeltPixelColorRGBSeven(offset, 255, 0, 0);
                }else if (hsv >= 8 && hsv < 35) { //橙色
                    this._setBeltPixelColorRGBSeven( offset, 255, 150, 0 );
                }else if (hsv >= 35 && hsv < 60) { //黄色
                    this._setBeltPixelColorRGBSeven( offset, 255, 230, 0 );
                }else if (hsv >= 60 && hsv < 90) { //浅绿色
                    this._setBeltPixelColorRGBSeven( offset, 150, 255, 0  );
                }else if (hsv >= 90 && hsv < 145) { //绿色
                    this._setBeltPixelColorRGBSeven( offset, 0, 255, 0  );
                }else if (hsv > 145 && hsv < 170) { //青色
                    this._setBeltPixelColorRGBSeven( offset, 0, 255, 190 );
                }else if (hsv >= 170 && hsv < 190) { //靛蓝色
                    this._setBeltPixelColorRGBSeven( offset, 0, 240, 255 );
                }else if (hsv >= 190 && hsv < 200) {//浅蓝色
                    this._setBeltPixelColorRGBSeven( offset, 0, 200, 255 );
                }else if (hsv >= 200 && hsv < 215) {//蓝色
                    this._setBeltPixelColorRGBSeven( offset, 0, 100, 255 );
                }else if (hsv >= 215 && hsv < 225) {//蓝色
                    this._setBeltPixelColorRGBSeven( offset, 0, 0, 255 );
                }else if (hsv >= 225 && hsv < 270) {//紫色
                    this._setBeltPixelColorRGBSeven( offset, 100, 0, 255 );
                }else if (hsv >= 270 && hsv < 290) {//浅紫色
                    this._setBeltPixelColorRGBSeven( offset, 180, 0, 235 );
                }else if (hsv >= 290 && hsv < 316) {//粉色
                    this._setBeltPixelColorRGBSeven( offset, 255, 0, 235 );
                }else if (hsv >= 316 && hsv < 335) {//玫红色
                    this._setBeltPixelColorRGBSeven( offset, 255, 0, 130 );
                }
                return;
            }
            // else if (c > 200 && red > 10 && green > 7 && blue > 7 && red < 16.5 && green < 15 && blue < 14) {
            //     this._setBeltPixelColorRGBSeven(offset, 0, 0, 0);
            // }

            this._setBeltPixelColorRGBSeven( offset, 0, 0, 0 );
        }

        _setBeltPixelColorRGBSeven(offset: number, red: number, green: number, blue: number) {  

            let stride = this._mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
            let pixeloffset: number = 0
            if (offset == 10)//全部
            {
                
                for (let i = 0; i < this._length; i++)
                {
                    pixeloffset= (i + this.start) * stride;
                    this.setBufferRGB( pixeloffset,  red, green, blue );     
                }
            }
            else
            {
                let pixeloffset1 = (offset * 3 + this.start) * stride;
                let pixeloffset2 = (offset * 3 + 1 + this.start) * stride;
                let pixeloffset3 = (offset * 3 + 2 + this.start) * stride;
                this.setBufferRGB(pixeloffset1, red, green, blue);
                this.setBufferRGB(pixeloffset2, red, green, blue);
                this.setBufferRGB(pixeloffset3, red, green, blue);
            }
        }

        setBeltPixelColorRGB(offset: number, red: number, green: number, blue: number): void { 

            let br = this.brightness;
            // red = red > 255 ? 255 : red; red = red < 0 ? 0 : red;
            // green = green > 255 ? 255 : green; green = green < 0 ? 0 : green;
            // blue = blue > 255 ? 255 : blue; blue = blue < 0 ? 0 : blue;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }

            let stride = this._mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
            let pixeloffset: number = 0;
            if (offset == 10)//全部
            {
                
                for (let i = 0; i < this._length; i++)
                {
                    pixeloffset= (i + this.start) * stride;
                    this.setBufferRGB( pixeloffset,  red, green, blue );     
                }
            }
            else
            {
                let pixeloffset1 = (offset * 3 + this.start) * stride;
                let pixeloffset2 = (offset * 3 + 1 + this.start) * stride;
                let pixeloffset3 = (offset * 3 + 2 + this.start) * stride;
                this.setBufferRGB(pixeloffset1, red, green, blue);
                this.setBufferRGB(pixeloffset2, red, green, blue);
                this.setBufferRGB(pixeloffset3, red, green, blue);
            }

           
            
        }

        setBeltPixelColor2( offset: number, rgb: CaptainTestColors): void {
            
            let tureRgb = 0;
            switch (rgb)
            {
                case CaptainTestColors.Red:
                    tureRgb = 0xFF0000;
                    break;    
                
                case CaptainTestColors.Yellow:
                    tureRgb = 0xFFFF00;
                    break;    
                    
                case CaptainTestColors.Green:
                    tureRgb = 0x00FF00;    
                    break;    

                case CaptainTestColors.TBlue:
                    tureRgb = 0x00baff;    
                    break;    

                case CaptainTestColors.Blue:
                    tureRgb = 0x1001a2;
                    break;    
                    
                case CaptainTestColors.Purple:
                    tureRgb = 0x8400ff;    
                    break;   
            }

            let stride = this._mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
            let pixeloffset: number = 0;

            let red = unpackR(tureRgb);
            let green = unpackG(tureRgb);
            let blue = unpackB(tureRgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }     

            if (offset == 10)//全部
            {
                
                for (let i = 0; i < this._length; i++)
                {
                    pixeloffset= (i + this.start) * stride;
                    this.setBufferRGB( pixeloffset,  red, green, blue );     
                }
            }
            else
            {
                let pixeloffset1 = (offset * 3 + this.start) * stride;
                let pixeloffset2 = (offset * 3 + 1 + this.start) * stride;
                let pixeloffset3 = (offset * 3 + 2 + this.start) * stride;
                this.setBufferRGB(pixeloffset1, red, green, blue);
                this.setBufferRGB(pixeloffset2, red, green, blue);
                this.setBufferRGB(pixeloffset3, red, green, blue);
            }
            
        }

        setPixelColor(pixeloffset: number, rgb: CaptainRGBColors): void {
            if (pixeloffset == this._length)//全部
            {
                for (let i = 0; i < this._length; i++)
                {
                    this.setPixelRGB(i, rgb);     
                }
            }
            else
            {
                this.setPixelRGB(pixeloffset, rgb);
            }
            
        }

        private setPixelRGB(pixeloffset: number, rgb: CaptainRGBColors): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;
            let tureRgb = 0;
                switch (rgb)
                {
                    case CaptainRGBColors.Red:
                        tureRgb = 0xFF0000;
                        break;    
    
                    case CaptainRGBColors.Orange:
                        tureRgb = 0xFFA500;    
                        break;    
    
                    case CaptainRGBColors.Yellow:
                        tureRgb = 0xFFFF00;
                        break;    
                        
                    case CaptainRGBColors.Green:
                        tureRgb = 0x00FF00;    
                        break;    
    
                    case CaptainRGBColors.Blue:
                        tureRgb = 0x0000FF;
                        break;    
                        
                    case CaptainRGBColors.Indigo:
                        tureRgb = 0x4b0082;    
                        break;    
    
                    case CaptainRGBColors.Violet:
                        tureRgb = 0x8a2be2;
                        break;    
                        
                    case CaptainRGBColors.Purple:
                        tureRgb = 0xFF00FF;    
                        break;   
    
                    case CaptainRGBColors.White:
                        tureRgb = 0xFFFFFF;    
                        break;   
                }

            let stride = this._mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(tureRgb);
            let green = unpackG(tureRgb);
            let blue = unpackB(tureRgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }

        setPixelColorRGB(offset: number, red: number, green: number, blue: number): void { 
            let br = this.brightness;
            // red = red > 255 ? 255 : red; red = red < 0 ? 0 : red;
            // green = green > 255 ? 255 : green; green = green < 0 ? 0 : green;
            // blue = blue > 255 ? 255 : blue; blue = blue < 0 ? 0 : blue;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }

            let stride = this._mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
            let pixeloffset: number = 0;

            if (offset == this._length)//全部
            {
                for (let i = 0; i < this._length; i++)
                {
                    pixeloffset= (i + this.start) * stride;
                    this.setBufferRGB(pixeloffset, red, green, blue);     
                }
            }
            else
            {
                pixeloffset= (offset + this.start) * stride;
                this.setBufferRGB(pixeloffset, red, green, blue)
            }
           
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === CaptainRGBPixelMode.RGB_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }

        show() {
            sendBuffer(this.buf, this.pin);
        }

        clear(): void {
            const stride = this._mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
            this.show();
        }
    }
    export function create(pin: DigitalPin, numleds: number, mode: CaptainRGBPixelMode): LHcaptainRGBLight {
        let light = new LHcaptainRGBLight();
        let stride = mode === CaptainRGBPixelMode.RGBW ? 4 : 3;
        light.buf = pins.createBuffer(numleds * stride);
        light.start = 0;
        light._length = numleds;
        light._mode = mode;
        light.setBrightness(255);
        light.setPin(pin);
        return light;
    }

    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }
    
}
