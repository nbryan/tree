import { useEffect, useRef, useState } from "react";

export interface TreeNode {
  name: string;
  status: "checked" | "partial" | "unchecked";
  children?: TreeNode[] | null;
}

export default function TreeSelect({ initialTree }: { initialTree: TreeNode[]; }) {
  const [tree, setTree] = useState<TreeNode[]>(initialTree);

  const listItems = tree.map((t, i) => {
    return (
      <TreeSelectSubtree key={t.name} node={t} index={i} changeHandler={handleChange} />
    );
  });

  return (
    <ul>
      {listItems}
    </ul>
  );

  function handleChange(indexes: number[]) {
    console.log(indexes);
    function copyTree(node: TreeNode): TreeNode {
      return {
        name: node.name,
        status: node.status,
        children: node.children?.map(copyTree)
      };
    }
    const nextTree = tree.map(copyTree);

    function setStatusDown(node: TreeNode, status: "checked" | "unchecked") {
      node.status = status;
      if (node.children) {
        for (const childNode of node.children) {
          setStatusDown(childNode, status);
        }
      }
    }
    let targetNode = nextTree[indexes[0]]
    for (let i = 1; i < indexes.length; i++) {
      if (targetNode.children) {
        targetNode = targetNode.children[indexes[i]];
      }
    }
    const nextStatus = targetNode.status === "checked" ? "unchecked" : "checked";
    setStatusDown(targetNode, nextStatus);

    function setStatusUp(node: TreeNode) {
      if (node.children && node.children.length > 0) {
        for (const childNode of node.children) {
          setStatusUp(childNode);
        }

        console.log("setting " + node.name);

        if (node.children.every(n => n.status === "checked")) {
          node.status = "checked";
        } else if (node.children.every(n => n.status === "unchecked")) {
          node.status = "unchecked";
        } else {
          node.status = "partial";
        }
      }
    }
    setStatusUp(nextTree[indexes[0]]);

    setTree(nextTree);
  }
}

export function TreeSelectSubtree({ node, index, changeHandler }: { node: TreeNode; index: number; changeHandler: (indexes: number[]) => void; }) {
  const checkboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (checkboxRef.current) {
      if (node.status === "partial") {
        checkboxRef.current.checked = false;
        checkboxRef.current.indeterminate = true;
      } else {
        checkboxRef.current.checked = node.status === "checked";
        checkboxRef.current.indeterminate = false;
      }
    }
  }, [node.status])

  let children;
  if (node.children) {
    children = (
      <ul>
        {node.children.map((n, i)=> <TreeSelectSubtree key={n.name} node={n} index={i} changeHandler={(i: number[]) => changeHandler([index, ...i])} />)}
      </ul>
    );
  }

  return (
    <li>
      <label><input ref={checkboxRef} type="checkbox" onChange={() => changeHandler([index])} /> {node.name}</label>
      {children}
    </li>
  );
}
