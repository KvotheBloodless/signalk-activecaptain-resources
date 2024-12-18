<h3 align="center">SignalK Active Captain Resources</h3>

<div align="center">

[![Release](https://img.shields.io/github/v/release/KvotheBloodless/signalk-activecaptain-resources)](https://github.com/KvotheBloodless/signalk-activecaptain-resources/releases)
[![GitHub Issues](https://img.shields.io/github/issues/KvotheBloodless/signalk-activecaptain-resources)](https://github.com/KvotheBloodless/signalk-activecaptain-resources/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/KvotheBloodless/signalk-activecaptain-resources)](https://github.com/KvotheBloodless/signalk-activecaptain-resources/pulls)
[![License](https://img.shields.io/github/license/KvotheBloodless/signalk-activecaptain-resources)](https://github.com/KvotheBloodless/signalk-activecaptain-resources?tab=MIT-1-ov-file#readme)

</div>

---

<p align="center">A plugin for the node.js <a href="https://github.com/SignalK/signalk-server">Signal K server</a> for boats to import points of interest from the <a href = "https://marine.garmin.com/thirdparty-stage/swagger/index.html">Garmin Active Captain API</a> and make these available as resources.
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Notes](#notes)
- [Authors](#authors)
- [Acknowledgments](#acknowledgement)

## 🧐 About <a name = "about"></a>

 * Garmin's ActiveCaptain brings together the large boating community enabling sharing of information making boating safer, less expensive and more enjoyable.

 * Signal K is an open source server application that runs as a central information hub on a boat. It centralises data, provides a rich API to consume the data, and is extensible through a comprehensive suite of plugins (such as this one) and web applications.

 * Freeboard is a powerful chart plotter web application that runs as a webapp on the Signal K server.

This plugin's purpose is to bring together these 3 components by making information from the ActiveCaptain API available as resources throught the Signal K server which can then be consumed and displayed by Freeboard as an extra layer of information on the chart.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you up and running.

### Prerequisites

 * A running instance of the Signal K node server with a position source (a GPS).

Instructions [here](https://github.com/SignalK/signalk-server/blob/master/README.md)

### Installing this plugin

Through the Signal K server Appstore, search for signalk-activecaptain-resources, and click the Install button.

![Signal K AppStore search](assets/search.png)

### Configuration

In the Signal K menu, head to Server -> Plugin Config, and find Garmin Active Captain Resources then enable the plugin. Default values are fine for now, so just click Submit.

<img width="996" alt="image" src="https://github.com/user-attachments/assets/1f3a0ebd-598d-40e7-847b-ae7ccb7c4607" />

## 🎈 Usage <a name="usage"></a>

In the Signal K menu, head to Webapps and launch Freeboard-SK. Enjoy the new information.

<img width="652" alt="image" src="https://github.com/user-attachments/assets/a0a83f64-b853-4381-9b5b-5434605d5eee" />

## ✍️ Authors <a name = "authors"></a>

- [@KvotheBloodless](https://github.com/KvotheBloodless) - Idea & Initial work

<a href="https://www.buymeacoffee.com/KvotheBloodless" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>


See also the list of [contributors](https://github.com/KvotheBloodless/signalk-activecaptain-resources/graphs/contributors) who participated in this project.
