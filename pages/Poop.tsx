import TreeSelect, { TreeNode } from "../src/tree_select/TreeSelect";

export default function Poop() {
    const initialTree: TreeNode[] = [
        {
            name: "A",
            status: "partial",
            children: [
                {
                    name: "B",
                    status: "partial",
                    children: [
                        {
                            name: "F",
                            status: "unchecked",
                            children: null
                        },
                        {
                            name: "D",
                            status: "unchecked",
                            children: null
                        },
                        {
                            name: "E",
                            status: "checked",
                            children: null
                        }
                    ]
                },
                {
                    name: "C",
                    status: "unchecked",
                    children: []
                }
            ]
        },
        {
            name: "X",
            status: "unchecked",
            children: [
                {
                    name: "Y",
                    status: "unchecked",
                    children: []
                },
                {
                    name: "Z",
                    status: "unchecked",
                    children: []
                }
            ]
        }
    ];

    return (
        <TreeSelect initialTree={initialTree} />
    );
}
