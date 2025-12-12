---
title: The <10w Media Center, NAS Seedbox & Classic Gaming Console.
date: 2017-03-30
description: Originally published on Medium
category: Hardware Projects
---
![NES-NAS](/images/Archive/Medium/nas1.webp) 
I used to pay upwards of $72 a year to run my media center and NAS seedbox. Now I’m paying only $2.50.

Even though the Chromecast is my favorite way to watch content on my TV, it struggles to play video files on my network and I’d prefer not to use another computer to stream. I was using a gaming PC I built in 2012 as my main entertainment system for a while but the power consumption was too much to justify the means. The power draw was between 78W at idle and up to 326W while gaming which according to my estimations could be between $1.50 and $6.50 a month (Austin monthly cost per kWh is about $2.8 and I used this calculator to do the maths). After paying $500 over the years I decided something needed to change plus I was already itching to nerd out on a new project. I was initially planning to build a standard HTPC running on an AMD Athelon processor but the power consumption was still too high and the build would have been over $300.

Using the Raspberry Pi 3 and a 2TB 2.5 usb hard drive I’m estimating 5w and at full tilt it hovers around 10w. This equates to 10 to 20 cents a month or about $2.50 a year tops. That’s a 90% power consumption difference! The NES part of the build came out of a desire to find a case that would fit well in my living room and I’ve always liked the look of the small grey box.

Here’s how I built it and how much it cost
Parts List

- Raspberry Pi 3 Model B Kit with Case ($50)
- AmazonBasics High-Speed Male to Female HDMI Extension Cable 3 Feet ($10)
- [Zune A/V Output Cable ($7)](https://www.amazon.com/gp/product/B000IXLHOM/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1)
- [Plugable USB 2.0 7-Port High Speed Hub with 15W Power Adapter ($18])(https://www.amazon.com/gp/product/B003Z4G3I6/ref=oh_aui_detailpage_o00_s00?ie=UTF8&psc=1)
- [Mausberry Shutdown Circuit ($18)](http://mausberry-circuits.myshopify.com/collections/frontpage/products/shutdown-circuit-use-your-own-switch)
- [2 NES Retrokit USB ($32)](http://www.retrousb.com/product_info.php?cPath=21&products_id=44)
- [40 Volume Salon Care Developer ($5)](http://www.sallybeauty.com/creme-developer/SLNCAR63,default,pd.html)
- Broken NES with 2 controllers ($40 on eBay)

Total: $180

**Step 1: Remove the age from the case**
![NES-NAS](/images/Archive/Medium/nas2.webp) 
Plastic from around the 80’s – early 90’s have a tendency to yellow which is due to a combination of flame retardants in the molding and UV rays. For about $4 you can remove this yellow with a little bottle of 40 volume creme developer and a giant ball of fire in the sky. Wash your plastic and cover it with this hair goop (some folks wrap their plastic in Saran wrap so the developer doesn’t evaporate), sit it under direct sunlight and wait a half an hour. I can’t believe people put this stuff on their scalps!

**Step 2: Software**
![NES-NAS](/images/Archive/Medium/nas3.webp) 
- [NOOBS Lite](https://www.raspberrypi.org/downloads/noobs/) install running OSMC
- Deluge [(I followed this guide)](https://www.howtogeek.com/142044/how-to-turn-a-raspberry-pi-into-an-always-on-bittorrent-box/)
- [Retrosmc](https://github.com/mcobit/retrosmc) for retro gaming

**Step 3: Wiring things up**

The main objective was to keep the NES looking as untouched as possible which meant not cutting holes to make output ports. Fortunately, the NES has an expansion slot Nintendo never used and convenient grooves underneath for running cables. I dremeled out the bottom expansion slot (still able to use the plastic cover) so I could run an HDMI extension cable.

I wanted the NES to work with analog televisions because the AV ports were there and the Pi’s 35mm audio port supports video (and it kept things looking stock but also functional). Unfortunately the channel switch wasn’t physically supported by the metal frame and I also couldn’t think of a practical use for it so it’s been removed. I may get back to this and figure out a way to configure it to activate a piece of software.

I wired up the NES to USB adapters to the internal connections so the controller ports appeared original externally and no controllers would needed to be butchered. It’s pretty fun navigating content with retro tech!

The NES power and reset buttons were wired up using the Mausberry switch circuit. The diagram can be found [here](http://mausberry-circuits.myshopify.com/pages/soldering-your-own-switch) and GPO pin layout [here](http://mausberry-circuits.myshopify.com/pages/setup). A 2.2ohm resistor was needed on the led ground otherwise it would burn at the temperature of the sun (pure white instead of a lovely red).