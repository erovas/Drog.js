# Drog.js
Drog.js is a fast, cross-browser and mobile-compatible drag and drop library for JavaScript

## Compatibility
- Works with all modern browsers from IE11+.

## How to use it?

Import the Drog.js JavaScript library wherever you want into the document before using it.

``` html
<script src="Drog.min.js"></script>
<script>
    let element = document.getElementById("element");
    let x = 200;
    let y = 200;
    Drog.on(element);
    Drog.move(element, x, y)
</script>
```

or

``` html
<script defer src="Drog.min.js"></script>
<script defer src="otherScript.js"></script>
```

or

``` html
<script type="module" src="Drog.min.js"></script>
<script type="module" src="otherScript.js"></script>
```

or

``` html
<script type="module">
    import "Drog.min.js";
    let element = document.getElementById("element");
    let x = 200;
    let y = 200;
    Drog.on(element);
    Drog.move(element, x, y);
</script>
```

Define an internal element with the [data-drog] property, to serve as a drag point:

``` html
<div id="element">
    <div data-drog>
        <span>Click here to move</span>
    </div>
    <p>Move</p>
    <p>this</p>
    <p>ELEMENT</p>
</div>
```

or so, to drag the element with any point of itself (see demo)

``` html
<div id="element">
    <div>
        <span>Click to</span>
    </div>
    <p>Move</p>
    <p>this</p>
    <p>ELEMENT</p>
</div>
```

## Changelog

Version 1.2.0
Added:
- Multi-touch support

Bugfix:
- focusable elements were not accessible

Version 1.1.0
Added:
- move() method

## Demo

https://erovas.github.io/Drog.js/

## Authors

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## License

This project is licensed under the BSD 3-Clause License - see the [LICENSE](https://github.com/erovas/Drog.js/blob/main/LICENSE) file for details.

# Spanish - Español

# Drog.js
Drog.js es un ligero, cross-browser y movil-compatible libreria de drag and drop JavaScript

## Compatibilidad
- Funciona con todos los navegadores modernos desde IE11+.

## ¿Cómo utilizarlo?
Importar la libreria Drog.js en cualquier parte dentro del documento antes de utilizarlo.

``` html
<script src="Drog.min.js"></script>
<script>
    let element = document.getElementById("element");
    let x = 200;
    let y = 200;
    Drog.on(element);
    Drog.move(element, x, y);
</script>
```

o

``` html
<script defer src="Drog.min.js"></script>
<script defer src="otherScript.js"></script>
```

o

``` html
<script type="module" src="Drog.min.js"></script>
<script type="module" src="otherScript.js"></script>
```

o

``` html
<script type="module">
    import "Drog.min.js";
    let element = document.getElementById("element");
    let x = 200;
    let y = 200;
    Drog.on(element);
    Drog.move(element, x, y);
</script>
```

Define un elemento interno con la propiedad [data-drog], para servir como punto de arrastre:

``` html
<div id="element">
    <div data-drog>
        <span>Click here to move</span>
    </div>
    <p>Move</p>
    <p>this</p>
    <p>ELEMENT</p>
</div>
```

o de esta forma, para arrastrar el elemento desde cualquier punto de el mismo (ver demo)

``` html
<div id="element">
    <div>
        <span>Click to</span>
    </div>
    <p>Move</p>
    <p>this</p>
    <p>ELEMENT</p>
</div>
```

## Registro de cambios

Version 1.2.0
Agregado:
- Soporte multitáctil

Arreglo de fallos:
- elementos enfocables no eran accesibles

Version 1.1.0
Agregado:
- Metodo move()

## Demo

https://erovas.github.io/Drog.js/

## Autores

* **Emanuel Rojas Vásquez** - *Initial work* - [erovas](https://github.com/erovas)

## Licencia

Este proyecto está licenciado bajo Licencia BSD 3-Clause - ver el archivo [LICENCIA](https://github.com/erovas/Drog.js/blob/main/LICENSE) para mas detalles.