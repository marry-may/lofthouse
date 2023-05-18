// Open Mobile Nav
const docBody = document.body;
const navMobile = document.querySelector(".header__top-row");
const navBtn = document.querySelector(".nav-icon-btn");
const navIcon = document.querySelector(".nav-icon");

navBtn.onclick = function () {
    navMobile.classList.toggle("header__top-row--active");
    navIcon.classList.toggle("nav-icon--active");
    docBody.classList.toggle("no-scroll");
};

// Phone Mask
mask("[data-tel-input]");

// Удаляем '+' если больше ничего не введено, чтобы показать placeholder
const phoneInputs = document.querySelectorAll("[data-tel-input]");
phoneInputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value == "+") input.value = "";
    });
    input.addEventListener("blur", () => {
        if (input.value == "+") input.value = "";
    });
});

//========== MAP ==========
// Initialize and add the map
let map;

async function initMap() {
    // Map Style
    const styledMapType = new google.maps.StyledMapType(
        [
            {
                elementType: "geometry",
                stylers: [
                    {
                        // color: "#212121",
                        color: "#242b33",
                        color: "#1f252e",
                        // color: "#1e262f",
                    },
                ],
            },
            {
                elementType: "labels.icon",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#757575",
                    },
                ],
            },
            {
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        // color: "#212121",
                        color: "#1e262f",
                    },
                ],
            },
            {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#757575",
                    },
                ],
            },
            {
                featureType: "administrative.country",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#9e9e9e",
                    },
                ],
            },
            {
                featureType: "administrative.land_parcel",
                stylers: [
                    {
                        visibility: "off",
                    },
                ],
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#bdbdbd",
                    },
                ],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#757575",
                    },
                ],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [
                    {
                        // color: "#181818",
                        color: "#181e26",
                    },
                ],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        // color: "#616161",
                        color: "#191e24",
                    },
                ],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.stroke",
                stylers: [
                    {
                        // color: "#1b1b1b",
                        color: "#191e24",
                    },
                ],
            },
            {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [
                    {
                        // color: "#2c2c2c",
                        color: "#323941",
                    },
                ],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#8a8a8a",
                    },
                ],
            },
            {
                featureType: "road.arterial",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#323941",
                    },
                ],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#323941",
                    },
                ],
            },
            {
                featureType: "road.highway.controlled_access",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#323941",
                    },
                ],
            },
            {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#616161",
                    },
                ],
            },
            {
                featureType: "transit",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#757575",
                    },
                ],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [
                    {
                        color: "#121921",
                    },
                ],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [
                    {
                        color: "#3d3d3d",
                    },
                ],
            },
        ],
        { name: "Styled Map" }
    );
    // The location
    const position = { lat: 38.53485392923902, lng: -0.1544967524931328 };

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 16,
        center: position,
        mapId: "LH_MAP",
        mapTypeControlOptions: {
            mapTypeIds: [
                "roadmap",
                "satellite",
                "hybrid",
                "terrain",
                "styled_map",
            ],
        },
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set("styled_map", styledMapType);
    map.setMapTypeId("styled_map");

    // Map Marker IMG
    const image = "./../images/map-marker.svg";

    // Map Marker SVG
    const parser = new DOMParser();
    // A marker with a custom inline SVG.
    const pinSvgString =
        '<svg width="44" height="54" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M36.1421 7.30866C43.9526 15.7202 43.9526 29.358 36.1421 37.7696L22 53L7.85786 37.7696C0.0473784 29.358 0.0473784 15.7202 7.85786 7.30866C15.6684 -1.10289 28.3316 -1.10289 36.1421 7.30866ZM22.1444 27.6389C25.4581 27.6389 28.1444 24.9526 28.1444 21.6389C28.1444 18.3252 25.4581 15.6389 22.1444 15.6389C18.8307 15.6389 16.1444 18.3252 16.1444 21.6389C16.1444 24.9526 18.8307 27.6389 22.1444 27.6389Z" fill="#D4C17F"/></svg>';
    const pinSvg = parser.parseFromString(
        pinSvgString,
        "image/svg+xml"
    ).documentElement;

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: "Uluru",
        // icon: image,
        content: pinSvg,
    });
}

initMap();
