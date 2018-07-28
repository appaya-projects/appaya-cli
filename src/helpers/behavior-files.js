function behaviorFile(name) {
return `import { Behavior } from "@appaya/behavior";

export class ${name} extends Behavior {
    protected defaultOptions: { [key: string]: any; };    
    public init(): void {
        throw new Error("Method not implemented.");
    }
}`;
}

function extendBehaviorFile(name, extendsFrom) {
    return `import { ${extendsFrom} } from "@appaya/behavior/list";

export class ${name} extends ${extendsFrom} {
    
}
`;
}

module.exports = {
    behaviorFile: behaviorFile,
    extendBehaviorFile: extendBehaviorFile
}