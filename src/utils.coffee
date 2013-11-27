( ( factory ) ->
    if typeof exports is "object"
        module.exports = factory()
    else if typeof define is "function" and define.amd
        define( [], factory )

)( () ->
    isArray = ( object ) ->
        # This is lifted from underscore.js
        # Reason is that it was the only reason to add underscore to some
        # modules so this saves us more then a few kilobytes
        #
        if Array.isArray?
            Array.isArray( object )
        else
            Object.prototype.toString.call( object ) == "[object Array]"

    # Convenience function to retrieve a value from an object as if it was a
    # selector-like path
    #
    # Example: child.attributes.0.value
    #
    getValue = ( path, object, valueIfMissing = undefined ) ->
        if not object? then return valueIfMissing

        aPath = path.split( "." )
        value = object
        key   = aPath.shift()

        if aPath.length is 0
            # This is only a 1 deep check
            #
            value = value[ key ]
            value = valueIfMissing if not value?

        else
            while value and key
                value = value[ key ]
                value = valueIfMissing if not value?
                key   = aPath.shift()

            value = if 0 is aPath.length then value else valueIfMissing

        return value;

    getAndCreate = ( path, object ) ->
        if not object? then return

        aPath = path.split( "." )
        value = object
        key   = aPath.shift()

        while key
            # Create non existing path element
            #
            if not value[ key ]?
                value[ key ] = {}

            # Proces the next path element
            #
            value = value[ key ]
            key   = aPath.shift()

        return value

    setValue = ( path, object, value ) ->
        targetValue = getAndCreate( path, object )
        targetValue = value

    # Return the module
    #
    objectUtils =
        isArray:        isArray
        getValue:       getValue
        getAndCreate:   getAndCreate
        setValue:       setValue
 )