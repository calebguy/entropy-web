module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "Create a DSL component",
    prompts: [{ type: "input", name: "name", message: "Component name" }],
    actions: [
      {
        type: "add",
        path: "packages/dsl/src/{{name}}/{{name}}.tsx",
        templateFile: "plop/Component.tsx.hbs",
      },
      {
        type: "add",
        path: "apps/docs/components/{{name}}.demo.tsx",
        templateFile: "plop/Demo.tsx.hbs",
      },
      {
        type: "append",
        path: "packages/dsl/index.tsx",
        template: "export * from './src/{{name}}/{{name}}'",
      },
    ],
  });
};
